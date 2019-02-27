module.exports =function(models){	
const Revision = require('../libs/CreateRevision')(models);
const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
const createEsSearch = require("../libs/elasticSearchAPI").createEsSearch;
const deleteEssearch = require("../libs/elasticSearchAPI").deleteEssearch;


models.Location.Location.watch(/*filter ,*/ {fullDocument: 'updateLookup'}).on('change',async  data => {
    console.log("I am Location watcher\n", data);
    try{

        //==========================Fetching User Details
        var user = {}
        var activityObj = {}
        var esObj = {}
        var activityFlag= true
        if (data.fullDocument && data.fullDocument.ITBUpdatedBy && data.fullDocument.ITBUpdatedBy != '') {


            if(data.fullDocument.ITBUpdatedBy == 'ITBOOST'){
                user.userName = 'ITBOOST'
                user.userId= 0
                activityFlag= false
            }
            else{
                let result = await models.User.findOne({userName: data.fullDocument.ITBUpdatedBy}, {
                    firstName: 1,
                    lastName: 1,
                    userId: 1
                })
                if (result) {
                    user = result
                    user.userName = await user.firstName + ' ' + user.lastName
                }
                else {
                    activityFlag= false
                    throw "Revisions ERROR: User \'" + data.fullDocument.ITBUpdatedBy + "\' not found in User Collection"
                }
            }

        }
        else {
            activityFlag = false
        }

        //==========================Deleting null 'id' in company object
        try{
            if (data.fullDocument.company && (data.fullDocument.company.id == null || data.fullDocument.company.id == undefined)) {
                delete data.fullDocument.company.id
            }
        }
        catch (err){

        }
        //==========================Allowing Revisions to be created upon events except 'Hard Delete'
        if (data.operationType == 'update' || data.operationType == 'replace' || data.operationType == 'insert') {
            Revision.saveRevision(data, "Location", "LocationHist", "");
            var mongoId = data.fullDocument._id
            if(activityFlag==true)
                activityObj = {
                action: data.operationType,
                comment: "Company location",
                assetName: 'Location',
                companyName: data.fullDocument.company.name,
                companyId: data.fullDocument.company.ITBCompanyId,
                recordId: data.fullDocument.uuid,
                recordName: data.fullDocument.name,
                orgId: data.fullDocument.orgId,
                action: data.operationType,
                user: {
                    userId: user.userId || null,
                    userName: user.userName || null
                }
            }
            esObj = {
                _id: mongoId.toString(),
                orgId: data.fullDocument.orgId,
                name: data.fullDocument.name,
                id: mongoId.toString(),
                company: data.fullDocument.company,
                tags: data.fullDocument.searchTags,
                userPermission: data.fullDocument.userPermission,
                companyUuid:data.fullDocument.companyUuid,
                uuid:data.fullDocument.uuid
            }

            /*let createESFlag = true
            Object.keys(esObj).forEach(async function(key){

                if(esObj[key] == undefined){
                    createESFlag = false
                }

            })*/

            //==========================Creating Insertion Activity & ES Create
            if (data.operationType == 'insert' && data.fullDocument.deletedAt == null) {
                createEsSearch(esObj, "companySite");
                Revision.saveActivity(activityObj, 'Activity', activityFlag)
            }
            //==========================Creating Updation Activity & ES Update
            else if (data.operationType == 'update' && data.fullDocument.deletedAt == null) {
                updateEsSearch(esObj, "companySite");
                Revision.saveActivity(activityObj, 'Activity', activityFlag)
            }
            //==========================Creating Deletion Activity & ES Delete
            else if (data.fullDocument.deletedAt != null) {
                deleteEssearch({
                    orgId: data.fullDocument.orgId,
                    id: mongoId.toString()
                }, "companySite");


                if (data.fullDocument.operationType && data.fullDocument.operationType == 'bulk delete') {
                    console.log('Bulk Deletion Occurring')
                }
                //==========================Creating Single Deletion Activity
                else if (!data.fullDocument.operationType) {
                    activityObj.action = 'DELETE'
                    Revision.saveActivity(activityObj, 'Activity', activityFlag)
                } else{}
            }
            //==========================Ignoring 'Hard Delete' operation
            else if (data.operationType == 'delete') {
            }
            else{}

        }
    }
    catch (err){
        console.log(err)
    }
    finally {

    }

});
}