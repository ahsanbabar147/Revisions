/* eslint-disable */
/*
##################################################################
-- Name 	        : Acitivty.js
-- Creation Date    : 11-6-2016
-- Author           : Noman Maqsood
-- Jira Reference   : ITB-141
-- Purpose          : Activity schema for tracking user activities
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

//var autoIncrement = require('mongoose-auto-increment');
//var mongoosastic = require('mongoosastic');
var autoIncrement = require('mongoose-auto-increment');
"use strict";
module.exports = function(mongoose) {
    autoIncrement.initialize(mongoose.connection);


    var Schema = mongoose.Schema;
    var activitySchema = new Schema({

        bulkDeletedItems:[{
            ITBAssetId:{
                type: String || Number
            },
            recordName:{
                type: String
            }
        }],

        orgId: {
            type: String
        },
        user: {
            userId: {
                type: Number,
                required: [true, "User Id is required field"]
            },
            userName: {
                type: String,
                required: [true, "User name is required field"]
            }
        },
        count: {
            type: Number,
            default: 1
        },
        linkId: {
            type: String
        },
        companyRef: {
            type: String
        },
        recordId: {
            type: String,
            es_indexed: true
        },
        assetName: {
            type: String,
            es_indexed: true
        },
        action: {
            type: String,
            es_indexed: true
        },
        value: {
            type: String
        },
        recordName: {
            type: String
        },
        companyId: {
            type: String,
        },
        companyName: {
            type: String
        },
        comment: {
            type: String
        },
        createdBy: {
            type: String
        },
        updatedBy: {
            type: String
        },
        deletedAt: {
            type: Date,
            default: null
        },
        deletedBy: {
            type: String
        }
    }, {
        timestamps: true
    });

    activitySchema.plugin(autoIncrement.plugin, {
        model: 'Activity',
        field: 'ITBActivityId',
        startAt: 1,
        incrementBy: 1
    });

   // activitySchema.plugin(mongoosastic);
    var Activity = mongoose.model('Activity', activitySchema);

/*    Activity.createMapping(function(err, mapping) {
        if (err) {} else {}
    });
*/
    return Activity;


};