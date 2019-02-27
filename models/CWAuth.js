/* eslint-disable */
"use strict";

// var autoIncrement = require('mongoose-auto-increment');
// var mongooseRedisCache = require("mongoose-redis-cache");
// var fs = require('fs')
// const configFile = require("../../config/config.json");
// const privateConfigFile = require("../../privateConfig/config.json");
// const config = privateConfigFile[configFile.currentEnv];
// var redisPort = config.redisPort;
// var redisHost = config.redisHost;
module.exports = function(mongoose) {
//    autoIncrement.initialize(mongoose);
    var Schema = mongoose.Schema;
    var authSchema = new Schema({
        orgId: {
            type: String,
            required: [true, "Organization Id is required "]
        },
        ITBAuthId: {
            type: Number
        },
        companyId: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        timeZone: {
            name: String,
            offset:String
        },
        isCloud: {
            type: Boolean,
            default: true
        },
        url: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        publicKey: {
            type: String,
            required: true
        },
        privateKey: {
            type: String,
            required: true
        },
        expiration: {
            type: String
        },
        encodedKeyCredentials: {
            type: String,
            required: true
        },
        encodedCompanyCredentials: {
            type: String,
            required: true
        },
        ITBlastUpdated: {
            type: Date
        },
        ITBcurrno: {
            type: Number
        },
        ITBrecordStatus: {
            type: String
        },
        ITBlastAuthorizedTimestamp: {
            type: Date
        },
        ITBAuthorizedBy: {
            type: String
        },
        ITBupdatedBy: {
            type: String
        },
        syncDate: {
            type: Date
        },
        createdBy: {
            type: String
        },
        updatedBy: {
            type: String
        },
        deletedBy: {
            type: String
        },
        deletedAt: {
            type: String
        },
        syncFlag: {
            type: String
        }
    }, {
        timestamps: true
    });
    // authSchema.set('redisCache', true);
    // authSchema.set('expires', 300);
    // mongooseRedisCache(mongoose, {
    //     host: redisHost,
    //     port: redisPort
    // })
    return mongoose.model('CWAuth', authSchema);

};