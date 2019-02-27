module.exports =function(models) {
    const Revision = require('../libs/CreateRevision')(models);

    models.Relationship.watch({fullDocument: 'updateLookup'}).on('change', data => {
        console.log("I am Relationship watcher");
        console.log(data);
        try {
            Revision.saveActivity({

                comment: Math.floor((Math.random(1) * 10) * 1234567).toString() + " updated Company location # " + 'values.ITBLocationId',
                assetName: 'Relationship',

                recordId: data.fullDocument.ITBRelationshipId,
                recordName: data.fullDocument.name,
                orgId: data.fullDocument.orgId,
                user: {
                    userId: Math.floor((Math.random(1) * 10)),
                    userName: data.fullDocument.updateBy
                }
            }, 'Activity')
        }
        catch(err){

        }

    });



    models.Activity.watch({fullDocument: 'updateLookup'}).on('change', data => {
        console.log("I am Activity watcher");
        console.log(data);
        })




    models.CWAuth.watch({fullDocument: 'updateLookup'}).on('change', data => {
        console.log("I am CWAuth watcher");
        console.log(data);
        try{
        Revision.saveActivity({

            action: data.operationType,
            assetName: 'CW Master Data Auth',
            companyName: data.fullDocument.companyId,
            companyId: data.fullDocument.companyId,
            recordId: Math.floor((Math.random(1) * 10)*1234567).toString(),
            recordName: "Master Data",
            orgId: data.fullDocument.orgId,
            user: {
                userId: Math.floor((Math.random(1) * 10)*1234567).toString(),
                userName: data.fullDocument.userName
            }
        }, 'Activity')

    }
catch(err){

    }


});
};