module.exports =function(models){	
const Revision = require('../libs/CreateRevision')(models);
    const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
    const createEsSearch = require("../libs/elasticSearchAPI").createEsSearch;
    const deleteEssearch = require("../libs/elasticSearchAPI").deleteEssearch;
		models.Contact.Contact.watch({fullDocument: 'updateLookup'}).on('change', async data => {
            console.log("I am Contact watcher\n", data);
		    try {
                //==========================Fetching User Details
                var user = {}
                var activityObj = {}
                var esObj = {}
                var activityFlag= true
                if (data.fullDocument && data.fullDocument.ITBUpdatedBy && data.fullDocument.ITBUpdatedBy != '') {
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
                else{
                    activityFlag= false
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
                    Revision.saveRevision(data, "Contact", "ContactHist", "");
                    var mongoId = data.fullDocument._id
                    if(activityFlag==true)
                    activityObj = {
                        action: data.operationType,
                        comment: Math.floor((Math.random(1) * 10) * 1234567).toString() + " updated Company contact # ",
                        assetName: 'Contact',
                        companyName: data.fullDocument.company.name,
                        companyId: data.fullDocument.company.ITBCompanyId,
                        recordId: data.fullDocument.uuid,
                        recordName: data.fullDocument.firstName,
                        orgId: data.fullDocument.orgId,
                        user: {
                            userId: user.userId,
                            userName: user.userName
                        }
                    }
                    let fullName = data.fullDocument.firstName;
                    if(data.fullDocument.lastName){
                        fullName = fullName +  " " + data.fullDocument.lastName;
                    }
                    esObj = {
                        _id: mongoId.toString(),
                        orgId: data.fullDocument.orgId,
                        name: fullName,
                        id: mongoId.toString(),
                        company: data.fullDocument.company,
                        ITBCompanyId: data.fullDocument.ITBCompanyId,
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
                        createEsSearch(esObj, "contact");
                        Revision.saveActivity(activityObj, 'Activity', activityFlag)
                    }
                    //==========================Creating Updation Activity & ES Update
                    else if (data.operationType == 'update' && data.fullDocument.deletedAt == null) {
                        updateEsSearch(esObj, "contact");
                        Revision.saveActivity(activityObj, 'Activity', activityFlag)
                    }
                    //==========================Creating Deletion Activity & ES Delete
                    else if (data.fullDocument.deletedAt != null) {
                        deleteEssearch({
                            orgId: data.fullDocument.orgId,
                            id: mongoId.toString()
                        }, "contact");


                        if (data.fullDocument.operationType && data.fullDocument.operationType == 'bulk delete') {
                            console.log('Bulk Deletion Occurring')
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
                    }
                    else{}
                }
            }
            catch (err){
		        console.error(err)
            }

          });
	

}