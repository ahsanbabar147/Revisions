module.exports =function(models) {
    const Revision = require('../libs/CreateRevision')(models);
    const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
    const createEsSearch = require("../libs/elasticSearchAPI").createEsSearch;
    const deleteEssearch = require("../libs/elasticSearchAPI").deleteEssearch;


        models.Configuration.Configuration.watch({fullDocument: 'updateLookup'}).on('change', async data => {

             console.log("I am configuration watcher\n", data);

            try {

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
                    console.log('Company Not Found')
                }

                //==========================Allowing Revisions to be created upon events except 'Hard Delete'
                if (data.operationType == 'update' || data.operationType == 'replace' || data.operationType == 'insert') {
                    var mongoId = data.fullDocument._id
                    var id = data.fullDocument["ITBConfigurationId"]
                    Revision.saveRevision(data, "Configuration", "ConfigurationHist", "ITBConfigurationId");
                    var mongoId = data.fullDocument._id
                    if(activityFlag==true)
                    activityObj = {
                        action: data.operationType,
                        comment: Math.floor((Math.random(1) * 10) * 1234567).toString() + " updated Company location # " + 'values.ITBLocationId',
                        assetName: 'Configuration',
                        companyName: data.fullDocument.company.name || '',
                        companyId: data.fullDocument.company.ITBCompanyId,
                        recordId: data.fullDocument.uuid,
                        recordName: data.fullDocument.name,
                        orgId: data.fullDocument.orgId,
                        user: {
                            userId: user.userId,
                            userName: user.userName
                        }
                    }
                    esObj = {
                        _id: mongoId.toString(),                                          //NEED TO HANDLE
                        orgId: data.fullDocument.orgId,
                        name: data.fullDocument.name,                                     //VERSION CONFLICT EXCEPTION
                        id: id,
                        company: data.fullDocument.company ,
                        tags: data.fullDocument.searchTags,
                        serialNumber: data.fullDocument.serialNumber,
                        configType: data.fullDocument.type,
                        assetTag: data.fullDocument.tagNumber,
                        userPermission: data.fullDocument.userPermission,
                        companyUuid:data.fullDocument.company.companyUuid,
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
                        if(data.fullDocument.ITBCompanyId != null){
                            createEsSearch(esObj, "configuration");
                        }
                        Revision.saveActivity(activityObj, 'Activity', activityFlag)
                    }
                    //==========================Creating Updation Activity & ES Update
                    else if (data.operationType == 'update' && data.fullDocument.deletedAt == null) {
                        if(data.fullDocument.ITBCompanyId != null) {
                            updateEsSearch(esObj, "configuration");
                        }
                        Revision.saveActivity(activityObj, 'Activity', activityFlag)
                    }
                    //==========================Creating Deletion Activity & ES Delete
                    else if (data.fullDocument.deletedAt != null) {
                        deleteEssearch({
                            orgId: data.fullDocument.orgId,
                            id: data.fullDocument.ITBConfigurationId,
                            ITBCompanyId: data.fullDocument.ITBCompanyId
                        }, "configuration");


                        if (data.fullDocument.operationType && data.fullDocument.operationType == 'bulk delete') {
                            console.log('Got ya')
                        }
                        //==========================Creating Single Deletion Activity
                        else if (!data.fullDocument.operationType) {
                            activityObj.action = 'DELETE'
                            Revision.saveActivity(activityObj, 'Activity', activityFlag)
                        }
                        else{}
                    }
                    //==========================Ignoring 'Hard Delete' operation
                    else if (data.operationType == 'delete') {
                        console.log('Purging...')
                    }
                    else{}

                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                //changeStream = await changeStream.next();

            }


        })

    }
