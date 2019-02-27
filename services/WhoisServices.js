module.exports =function(models){	
const Revision = require('../libs/CreateRevision')(models);
const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
const deleteEssearch = require("../libs/elasticSearchAPI").deleteEssearch;

models.Company.Company.watch({fullDocument: 'updateLookup'}).on('change', async data => {
    try {


        if (data.updateDescription) {
            if (Object.keys(data.updateDescription.updatedFields).toString().indexOf("whois") >= 0) {


                var whoisIndex = ''
                Object.keys(data.updateDescription.updatedFields).forEach(function (key) {
                    if (key.indexOf("whois.") >= 0) {
                        whoisIndex = key.split('.')[1];
                    }

                    else if (!(key.indexOf(".") >= 0 )  && !(key.indexOf("updatedAt") >= 0 ) && Array.isArray(data.updateDescription.updatedFields[key])) {
                        whoisIndex = 0;
                    }
                })
                console.log("I am Whois watcher\n");
                console.log(data.fullDocument.whois[whoisIndex])
                var mongoId = data.fullDocument.whois[whoisIndex]._id

                data.fullDocument.whois[whoisIndex].orgId = data.fullDocument.orgId
                data.fullDocument.whois[whoisIndex].ITBCompanyId = data.fullDocument.ITBCompanyId
                data.fullDocument.whois[whoisIndex].ITBLastUpdated = data.updateDescription.updatedFields.updatedAt

                let rdata = {}
                rdata.fullDocument = {}
                rdata.operationType = data.operationType
                rdata.fullDocument = data.fullDocument.whois[whoisIndex]


               await  Revision.saveRevision(rdata, "Whois", "WhoisHist", "ITBWhoisId");


                  try{

                //     let actid=Math.floor((Math.random(1) * 10)*1234567).toString()
                //      console.log(actid, '>>>')

                await Revision.saveActivity({
                    action: data.operationType,
                    comment: 'WhoIs',
                    assetName: 'Domain',
                    companyName: data.fullDocument.name,
                    companyId: data.fullDocument.ITBCompanyId,
                    recordId: rdata.fullDocument.uuid,
                    recordName: rdata.fullDocument.domainName,
                    orgId: rdata.fullDocument.orgId,
                    user: {
                        userId: Math.floor((Math.random(1) * 10)),
                        userName: rdata.fullDocument.ITBUpdatedBy
                    }
                }, 'Activity')
                  }
                 catch(err){
                             console.log('Activity failed...', err)

                    }

                /*updateEsSearch({
                        _id: mongoId.toString(),
                        orgId: rdata.fullDocument.orgId,
                        name: (rdata.fullDocument.domainName).toLowerCase(),
                        id: mongoId.toString(),
                        company: {
                            ITBCompanyId: data.fullDocument.ITBCompanyId,
                            name: data.fullDocument.name

                        },
                        tags: rdata.fullDocument.searchTags
                    }, "whois");
        */

            }
            else{}
        }
        else{}
        /*else if (data.operationType == 'insert' && !(data.fullDocument.whois)){


                try{
                    console.log(mongoId.toString(), ',,,/,./')
               createEsSearch({


                    _id: mongoId.toString(),
                    orgId: rdata.fullDocument.orgId,
                    name: (rdata.fullDocument.domainName).toLowerCase(),
                    id: mongoId.toString(),
                    //ITBCompanyId: id,
                    company: {
                        ITBCompanyId: data.fullDocument.ITBCompanyId,
                        name: data.fullDocument.name,
                    },
                    tags: rdata.fullDocument.searchTags,
                    identifier: data.fullDocument.identifier
                }, "whois");
                }
                catch (err){
                    console.log(err)
                }

            }*/


    }
    catch (err){

    }
    finally {

    }


        });

}
