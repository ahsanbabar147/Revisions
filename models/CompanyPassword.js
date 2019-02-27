 /* eslint-disable */
"use strict";


/*
##################################################################
-- Name             : CompanyPassword.js
-- Creation Date    : 24-11-2016
-- Author           : Abdulhaq Shah
-- Jira Reference   : ITB-737
-- Purpose          : Schema For Company Password
-- Parameters       : None
-- Returns          : None
-- Notes for Others : None
-- Reviewed By      : Abdulhaq Shah
-- Reviewed Date    : 24-11-2016
##################################################################
-- Version     Revision By    Ticket Reference     Description
--
##################################################################
*/
var autoIncrement = require('mongoose-auto-increment');

module.exports = function(mongoose) {
    // autoIncrement.initialize(mongoose);
    var Schema = mongoose.Schema;
    var CompanyPasswordSchema = new Schema({
        operationType:{
            type: String
        },

        ITBCompanyPasswordId: {
            type: Number
        },
        alt_id: {
            type: String
        },
        typeId: {
            type: String
        },
        uuid: {
            type: String
        },
        ITBCompanyId: {
            type: Number,
            required: false
        },
        companyName: {
            type: String
        },
        companyUuid: {
            type: String
        },
        orgId: {
            type: String,
            required: false
        },
        userKeyPasswordProtected: {
            type: Boolean,
            default: false
        },
       /* bulkDeletionFlag: {
            type: Boolean,
            default: false
        },*/
        passwordName: {
            type: String,
            required: false
        },
        userNamePassword: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        server: {
            type: String
        },
        type: {
            type: String
        },
        notes: {
            type: String
        },
        searchTags: [{
            type: String
        }],
        ITBNotes: [{
            description: {
                type: String
            },
            modalFlag: {
                type: Boolean
            },
            priority: {
                type: String
            },
            date: {
                type: String
            },
        }],
        attachment: [{
            fieldname: {
                type: String
            },
            originalname: {
                type: String
            },
            mimetype: {
                type: String
            },
            destination: {
                type: String
            },
            filename: {
                type: String
            },
            path: {
                type: String
            },
            size: {
                type: Number
            }
        }],
        linkedItem: [{
            relatedAsset: {
                type: String,
                required: false
            },
            relatedAssetPath: {
                type: String,
                required: false
            },
            relatedAssetId: {
                type: String,
                required: false
            },
            relatedAssetName: {
                type: String,
                required: false
            }
        }],
        deletedAt: {
            type: Date,
            default: null
        },
        expiryDate: {
            type: Date
        },
        ITBLastUpdated: {
            type: Date
        },
        ITBUpdatedBy: {
            type: String
        },
        deletedBy: {
            type: String
        },
        lastUpdated: {
            type: Date
        },
        updatedBy: {
            type: String
        },
    }, {
        timestamps: true,
        timeZone: "Asia/Karachi"
    });

    // CompanyPasswordSchema.plugin(autoIncrement.plugin, {
    //     model: 'CompanyPassword',
    //     field: 'ITBCompanyPasswordId',
    //     startAt: 1,
    //     incrementBy: 1
    // });

   // return mongoose.model('CompanyPassword', CompanyPasswordSchema);
    var CompanyPassword = mongoose.model('CompanyPassword', CompanyPasswordSchema);
    var CompanyPasswordHist = mongoose.model('CompanyPasswordHist', CompanyPasswordSchema);
    return {
        CompanyPassword: CompanyPassword,
        CompanyPasswordHist: CompanyPasswordHist
    };

};