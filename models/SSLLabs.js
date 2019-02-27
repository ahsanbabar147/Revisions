/* eslint-disable */
/*
##################################################################
-- Name 	         : SSLLabs.js
-- Creation Date    : 20-05-2016
-- Author           : Noman Maqsood
-- Jira Reference   : ITB-133
-- Purpose          :
-- Parameters       :
-- Returns          :
-- Notes for Others :
-- Reviewed By      :
-- Reviewed Date    :
##################################################################
-- Version     Revision By    Ticket Reference     Description
--
##################################################################
*/

"use strict";

var autoIncrement = require('mongoose-auto-increment');

module.exports = function(mongoose) {
   // autoIncrement.initialize(mongoose);
    var Schema = mongoose.Schema;
    var ssllabsSchema = new Schema({
        operationType:{
            type: String
        },
        uuid: {
            type: String,
            required: true
        },
        ITBSSLLabId: {
            type: Number
        },
        website: {
            type: String
        },
        syncCronOperation: {
            type: Date
        },
        orgId: {
            type: String,
            required: [true]
        },
        alt_id: {
            type: String
        },
        ITBCompanyId: {
            type: Number
        },
        companyName: {
            type: String
        },
        ipAddress: {
            type: String
        },
        serverName: {
            type: String
        },
        status: {
            type: String
        },
        grade: {
            type: String
        },
        hostStartTime: {
            type: String
        },
        key: {},
        altNames: [],
        commanNames: [],
        subject: {
            type: String
        },
        notBefore: {
            type: String
        },
        notAfter: {
            type: String
        },
        issuerSubject: {
            type: String
        },
        sigAlg: {
            type: String
        },
        sha1Hash: {
            type: String
        },
        pinSha256: {
            type: String
        },
        validationType: {
            type: String
        },
        createdBy: {
            type: String
        },
        ITBLastUpdated: {
            type: Date
        },
        ITBUpdatedBy: {
            type: String
        },
        updatedBy: {
            type: String
        },
        ssl_updatedAt:{
            type: String
        },
        deletedAt: {
            type: String
        },
        deletedBy: {
            type: String
        },
        certs: [],
        // Expity email sent or not flag
        expiryResponseSent: {
            type: Boolean
        },
        customPort: {
            type: Boolean,
            default: false
        },
        searchTags: [{
            type: String
        }],

    }, {
        timestamps: true
    });

     // ssllabsSchema.plugin(autoIncrement.plugin, {
     //     model: 'SSLLabs',
     //     field: 'ITBSSLLabId',
     //     startAt: 1,
     //     incrementBy: 1
     // });

    // return mongoose.model('SSLLabs', ssllabsSchema);
    var SSLLabs= mongoose.model('SSLLabs', ssllabsSchema );
    var SSLLabsHist= mongoose.model('SSLLabsHist', ssllabsSchema );
    return{
        SSLLabs:SSLLabs,
        SSLLabsHist:SSLLabsHist
    };


};