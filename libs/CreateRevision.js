var extend = require('util')._extend;
module.exports =function(models) {
    return {
        saveRevision: async function (data, model, subModel, prop) {
            try {
                let dataC = JSON.parse(JSON.stringify(data));
                if (dataC.fullDocument._id) {
                    delete dataC.fullDocument._id;
                }
                if (prop != '') {
                    delete dataC.fullDocument[prop];
                }
                dataC.fullDocument.operationType = data.operationType;

                if (dataC.fullDocument.ITBLastUpdated || dataC.fullDocument.updatedAt) {
                    dataC.fullDocument.ITBLastUpdated = dataC.fullDocument.updatedAt = Date.now()
                }

                let result = await
                models[model][subModel].create(dataC.fullDocument)
                return result
            }
            catch (err) {
                console.error(err, '\n Try after dropping the respective hist collection...\n');
            }
        },
        saveActivity: async function (data, model, flag=true) {
            if (flag == true)
                try {
                    if (data.action == 'insert') {
                        data.action = 'POST'
                    }
                    else if (data.action == 'update' || data.action == 'replace') {
                        data.action = 'PUT'
                    }
                    else if (data.action == 'delete' || data.action == 'bulk delete') {
                        data.action = 'DELETE'
                    }
                    let result = await
                    models[model].create(data)
                    return {status: true, code: 201, message: "Activity has been saved successfully", data: result};
                }
                catch (err) {
                    console.log(err)
                    return {status: false, code: 400, errors: err};
                }
        },
        pushRevision: async function (data, collection) {
            const currentEnv = require("../../config/config.json").currentEnv;
            let privateConfig= require("../../privateConfig/config.json");
            const config = privateConfig[currentEnv];



            let MongoClient = require('mongodb').MongoClient;
            let url = "mongodb://"+config.dbHost+":"+config.dbPort;
            let DB_NAME = config.dbName;

            try{
                MongoClient.connect(url, {useNewUrlParser: true}, async function (err, db) {
                    if (err) throw err;
                    try {
                        let dbo = await db.db(DB_NAME);
                        console.log('I am', collection, 'watcher\n', data);

                        if( (data.fullDocument.operationType == null || data.fullDocument.operationType == '') && data.operationType){
                            data.fullDocument.operationType = data.operationType
                        }


                        if(data.fullDocument){
                            if(data.fullDocument._id){
                                await delete data.fullDocument._id
                            }
                            if(data.ns){
                                if(data.ns.coll){
                                    data.fullDocument.ns=await data.ns.coll
                                }
                            }
                            let result = await dbo.collection("generals").insertOne(data.fullDocument)
                            if(result.insertedCount == 1){
                                await db.close()
                            }
                        }
                    }
                    catch (err) {
                        console.log(err)
                    }
                })
            }
            catch (err){
                console.log(err)
            }

        }
    }
};