module.exports =function(models){	
const Revision = require('../libs/CreateRevision')(models);
    const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
    const createEsSearch = require("../libs/elasticSearchAPI").createEsSearch;
    const deleteEssearch = require("../libs/elasticSearchAPI").deleteEssearch;
    models.SSLLabs.SSLLabs.watch({fullDocument: 'updateLookup'}).on('change', async data => {
      console.log("I am SSL watcher\n", data);
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


                var mongoId = data.fullDocument._id
                var id= data.fullDocument.ITBSSLLabId
                if(activityFlag==true)
                activityObj=
                    {
                        action: data.operationType,
                        comment: Math.floor((Math.random(1) * 10) * 1234567).toString() + " updated Company location # " + 'values.ITBLocationId',
                        assetName: 'SSLLabs',
                        companyName: data.fullDocument.companyName,
                        companyId: data.fullDocument.ITBCompanyId,
                        recordId: data.fullDocument.uuid,
                        recordName: data.fullDocument.website,
                        orgId: data.fullDocument.orgId,
                        user: {
                            userId: user.userId,
                            userName: user.userName
                        }
                    }
                esObj={
                    _id: mongoId.toString(),
                    orgId: data.fullDocument.orgId,
                    name: data.fullDocument.website,
                    id: id,
                    itbCompanyId: data.fullDocument.ITBCompanyId,
                    tags: data.fullDocument.searchTags,
                    expiryResponseSent: false,
                    userPermission: data.fullDocument.userPermission,
                    companyUuid:data.fullDocument.companyUuid,
                uuid:data.fullDocument.uuid
                }



                if(data.fullDocument.status == 'Completed'){
                    //createEsSearch(esObj, "ssl");
                    Revision.saveRevision(data, "SSLLabs", "SSLLabsHist", "ITBSSLLabId");
                }



                //==========================Creating Insertion Activity & ES Create
                if (data.operationType == 'insert' && data.fullDocument.status == 'Pending') {
                    createEsSearch(esObj, "ssl");
                    //User Error to be handled
                    //Revision.saveActivity(activityObj, 'Activity')
                }
                //==========================Creating Updation Activity & ES Update
                else if (data.operationType == 'update' && data.fullDocument.status == 'Completed') {
                    updateEsSearch(esObj, "ssl");
                        Revision.saveActivity(activityObj, 'Activity')
                }
                //==========================Creating Deletion Activity
                else if (data.fullDocument.deletedAt != null) {
                    //activityObj.action = 'DELETE'

                    if (data.fullDocument.operationType && data.fullDocument.operationType == 'bulk delete') {
                        console.log('Got ya')
                    }
                    //==========================Creating Single Deletion Activity
                    else if (!data.fullDocument.operationType) {
                        //Revision.saveActivity(activityObj, 'Activity')
                    }
                    else{}
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