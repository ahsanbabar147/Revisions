/* eslint-disable */ 
"use strict";
/*
##################################################################
-- Name 	        : AssetTemplateData.js
-- Creation Date    : 16-6-2016
-- Author           : Noman Maqsood
-- Jira Reference   : ITB-147
-- Purpose          : to store data of flexible asset template
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
module.exports = function(mongoose) {
//    autoIncrement.initialize(mongoose);
    var Schema = mongoose.Schema;
    var assetTemplateDataSchema = new Schema({
        operationType:{
            type: String
        },
        recordStatus: {
            type: String
        },
        alt_id: {
            type: String
        },
        uuid: {
            type: String
        },
        searchName: {
            type: String
        },
        ITBTemplateDataId: {
            type: Number,
            required: true,
            index: true
        },
        orgId: {
            type: String,
            required: [true, "Organization Id is required "]
        },
        ITBCompanyId: {
            type: Number,
            required: [true, "ITBCompanyId is required"]
        },
        companyName: {
            type: String,
            required: [true, "Company Name is required"]
        },
        companyUuid: {
            type: String,
        },
        ITBTemplateName: {
            type: String,
            required: [true, "Template Name is required"]
        },
        ITBTemplateId: {
            type: Number,
            required: [true, "Template Id is required"]
        },
        ITBTemplateUuid: {
            type: String,
            required: [true, "Template Uuid is required"]
        },
        formData: [],
        password: [{
            passwordName: {
                type: String
            },
            userName: {
                type: String
            },
            password: {
                type: String
            },
            server: {
                type: String
            }
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
                required: true
            },
            relatedAssetPath: {
                type: String,
                required: true
            },
            relatedAssetId: {
                type: String,
                required: true
            },
            relatedAssetName: {
                type: String,
                required: true
            }
        }],
        tags: [],
        deletedAt: {
            type: Date
        },
        ITBLastUpdated: {
            type: Date
        },
        ITBUpdatedBy: {
            type: String
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
        searchTags: [{
            type: String
        }],
    }, {
        timestamps: true
    });
/*
    assetTemplateDataSchema.plugin(autoIncrement.plugin, {
        model: 'AssetTemplateData',
        field: 'ITBTemplateDataId',
        startAt: 1,
        incrementBy: 1
    });

   return mongoose.model('AssetTemplateData', assetTemplateDataSchema);
*/
    let AssetTemplateData= mongoose.model('AssetTemplateData', assetTemplateDataSchema);
    let AssetTemplateDataHist= mongoose.model('AssetTemplateDataHist', assetTemplateDataSchema);
    return{
        AssetTemplateData:AssetTemplateData,
        AssetTemplateDataHist:AssetTemplateDataHist
    }
};