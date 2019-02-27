module.exports =function(models){	
const Revision = require('../libs/CreateRevision')(models);
const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
const createEsSearch = require("../libs/elasticSearchAPI").createEsSearch;
const deleteEssearch = require("../libs/elasticSearchAPI").deleteEssearch;

models.Company.Company.watch({fullDocument: 'updateLookup'}).on('change', async data => {
    console.log("I am Company watcher\n", data);

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
        //==========================Allowing Revisions to be created upon events except 'Hard Delete'
        if (data.operationType == 'update' || data.operationType == 'replace' || data.operationType == 'insert') {
            Revision.saveRevision(data, "Company", "CompanyHist", "ITBCompanyId");
            var mongoId = data.fullDocument._id
            var id= data.fullDocument.ITBCompanyId
            if(activityFlag==true)
            activityObj={
                action: data.operationType,
                comment: Math.floor((Math.random(1) * 10) * 1234567).toString() + " updated Company location # " + 'values.ITBLocationId',
                assetName: 'Company',
                companyName: data.fullDocument.name,
                companyId: data.fullDocument.ITBCompanyId,
                recordId: data.fullDocument.uuid,
                recordName: data.fullDocument.name,
                orgId: data.fullDocument.orgId,
                user: {
                    userId: user.userId,
                    userName: user.userName
                }
            }

            var a = [];
            if( data.fullDocument.userPermission.length > 0){
                data.fullDocument.userPermission.map(permissionId => a.push({'id':permissionId}));
            }
            esObj={
                orgId: data.fullDocument.orgId,
                name: data.fullDocument.name,
                id: id,
                _id: mongoId.toString(),
                ITBCompanyId: id,
                tags: data.fullDocument.searchTags,
                identifier: data.fullDocument.identifier,
                userPermission: a,
                 companyUuid:data.fullDocument.uuid,
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
                createEsSearch(esObj, "company");
                Revision.saveActivity(activityObj, 'Activity', activityFlag)
            }
            //==========================Creating Updation Activity & ES Update
            else if (data.operationType == 'update' && data.fullDocument.deletedAt == null) {
                updateEsSearch(esObj, "company");
                let whoIsFlag= false
                Object.keys(data.updateDescription.updatedFields).forEach(function (key) {
                        if (key.indexOf("whois") >= 0) {
                            whoIsFlag= true
                        }
                    })
                if(whoIsFlag == false)
                Revision.saveActivity(activityObj, 'Activity', activityFlag)
            }
            //==========================Creating Deletion Activity & ES Delete
            else if (data.fullDocument.deletedAt != null) {
                deleteEssearch({
                    orgId: data.fullDocument.orgId,
                    id:  mongoId.toString(),
                    ITBCompanyId: data.fullDocument.ITBCompanyId
                }, "company");

                    console.log(data.fullDocument.operationType, '<.,.,.,>', data.operationType)
                if (data.fullDocument.operationType && data.fullDocument.operationType == 'bulk delete') {
                    console.log('Got ya')
                }
                //==========================Creating Single Deletion Activity
                else if (!data.fullDocument.operationType) {
                    activityObj.action = 'DELETE'
                    Revision.saveActivity(activityObj, 'Activity', activityFlag)
                }else{}
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








/*


    /////////////////////////////////
    if (data.operationType != 'delete' && data.operationType != 'invalidate' && data.operationType != '') {
        var id= data.fullDocument.ITBCompanyId
        var mongoId= data.fullDocument._id
        var activityObj={
            action: data.operationType,
            comment: Math.floor((Math.random(1) * 10) * 1234567).toString() + " updated Company location # " + 'values.ITBLocationId',
            assetName: 'Company',
            companyName: data.fullDocument.name,
            companyId: data.fullDocument.ITBCompanyId,
            recordId: data.fullDocument.uuid,
            recordName: data.fullDocument.name,
            orgId: data.fullDocument.orgId,
            ITBActivityId: Math.floor((Math.random(1) * 10) * 1234567).toString(),
            user: {
                userId: Math.floor((Math.random(1) * 10)),
                userName: data.fullDocument.ITBUpdatedBy
            }
        }
        var esObj={
            orgId: data.fullDocument.orgId,
            name: data.fullDocument.name,
            id: id,
            _id: mongoId.toString(),
            ITBCompanyId: id,
            tags: data.fullDocument.searchTags,
            identifier: data.fullDocument.identifier
        }
        Revision.saveRevision(data, "Company", "CompanyHist", "ITBCompanyId");
    }
    if(data.fullDocument.deletedAt == null || data.fullDocument.deletedAt == undefined) {
        try {
            Revision.saveActivity(activityObj, 'Activity')
        }
        catch (err) {

        }
    }

    if(data.operationType== 'insert'){
        createEsSearch(esObj, "company");

    }
    else if(data.operationType == 'update' || data.operationType == 'replace') {

    if(data.fullDocument.deletedAt === null || data.fullDocument.deletedAt === undefined) {

        updateEsSearch(esObj, "company");
    }
    else {
        deleteEssearch({
            orgId:  data.fullDocument.orgId,
            ITBCompanyId: id,
        }, "company");
        activityObj.action= 'DELETE'
        Revision.saveActivity(activityObj, 'Activity')

    }
    }
    else if(data.operationType == 'delete') {
    }
    //////////////////////////////////////////*/
        });
	
}