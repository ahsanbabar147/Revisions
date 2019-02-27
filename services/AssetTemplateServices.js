module.exports =function(models){
    const Revision = require('../libs/CreateRevision')(models);
    const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
    const createEsSearch = require("../libs/elasticSearchAPI").createEsSearch;
    const deleteEssearch = require("../libs/elasticSearchAPI").deleteEssearch;
    models.AssetTemplateData.AssetTemplateData.watch({fullDocument: 'updateLookup'}).on('change', async data => {
        console.log("I am Asset Template Data watcher\n", data);

        try{

            //==========================Fetching User Details
            var user = {}
            var activityObj = {}
            //var esObj = {}
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
                activityFlag= false
            }

            //==========================Allowing Revisions to be created upon events except 'Hard Delete'
            if (data.operationType == 'update' || data.operationType == 'replace' || data.operationType == 'insert') {
                Revision.saveRevision(data, "AssetTemplateData", "AssetTemplateDataHist", "");
                //var mongoId = data.fullDocument._id
                if(activityFlag==true)
                activityObj={
                    action: data.operationType,
                    comment: Math.floor((Math.random(1) * 10) * 1234567).toString() + " updated Company location # " + 'values.ITBLocationId',
                    assetName: 'Asset Template Data',
                    companyName: data.fullDocument.name,
                    companyId: data.fullDocument.ITBCompanyId,
                    recordId: data.fullDocument.uuid,
                    recordName: data.fullDocument.ITBTemplateName,
                    orgId: data.fullDocument.orgId,
                    user: {
                        userId: user.userId ,
                        userName: user.userName
                    }
                }
                /*esObj={
                    orgId: data.fullDocument.orgId,
                    name: data.fullDocument.passwordName,
                    id: mongoId.toString(),
                    _id: mongoId.toString(),
                    company: {
                        name: data.fullDocument.companyName,
                        ITBCompanyId: data.fullDocument.ITBCompanyId
                    },
                    ITBCompanyId: data.fullDocument.ITBCompanyId,
                    tags: data.fullDocument.searchTags
                }*/
                //==========================Creating Insertion Activity & ES Create
                if (data.operationType == 'insert' && data.fullDocument.deletedAt == null) {
                    //createEsSearch(esObj, "companyPassword");
                    Revision.saveActivity(activityObj, 'Activity')
                }
                //==========================Creating Updation Activity & ES Update
                else if (data.operationType == 'update' && data.fullDocument.deletedAt == null) {
                    //updateEsSearch(esObj, "companyPassword");
                    Revision.saveActivity(activityObj, 'Activity')
                }
                //==========================Creating Deletion Activity & ES Delete
                else if (data.fullDocument.deletedAt != null) {
                    /*deleteEssearch({
                        orgId: data.fullDocument.orgId,
                        id:  mongoId.toString(),
                        ITBCompanyId: data.fullDocument.ITBCompanyId
                    }, "companyPassword");*/


                    if (data.fullDocument.operationType && data.fullDocument.operationType == 'bulk delete') {
                        console.log('Got ya')
                    }
                    //==========================Creating Single Deletion Activity
                    else if (!data.fullDocument.operationType) {
                        activityObj.action = 'DELETE'
                        Revision.saveActivity(activityObj, 'Activity')
                    }
                    else{}
                }
                //==========================Ignoring 'Hard Delete' operation
                else if (data.operationType == 'delete') {
                }
                else{}
            }
            else{}
        }
        catch (err){
            console.log(err)
        }
        finally {

        }

    });

}