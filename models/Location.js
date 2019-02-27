/* eslint-disable */
/*
##################################################################
-- Name              : Company.js
-- Creation Date    : 20-05-2016
-- Author           : Noman Maqsood
-- Jira Reference   : ITB-206
-- Purpose          : Connetwise company schema
-- Parameters       :
-- Returns          : object of Company
-- Notes for Others :
-- Reviewed By      :
-- Reviewed Date    :
##################################################################
-- Version     Revision By    Ticket Reference     Description
--
##################################################################
*/
//var autoIncrement = require('mongoose-auto-increment');
var uuid = require('uuid');
"use strict";
module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  var locationSchema = new Schema({
      operationType:{
          type: String
      },
      ITBCompanyId: {
          type: Number
      },
      orgId: {
          type: String
      },
      alt_id: {
          type: String
      },
      updatedAt: {
          type: Date,
          default: Date.now()
      },
      updatedBy: {
          type: String,
          default: ""
      },
      deletedBy: {
          type: String

      },
      deletedAt: {
          type: Date
      },
      uuid: {
          type: String
      },
      recordStatus: {
          type: String
      },
      tags: [],
      id: {
          type: Number
      },
      name: {
          type: String
      },
      addressLine1: {
          type: String
      },
      addressLine2: {
          type: String
      },
      city: {
          type: String
      },
      syncStatus: {
          type: String,
          default: null
      },
      company: {
          id: {
              type: String
          },
          name: {
              type: String
          },
          identifier: {
              type: String
          },
          ITBCompanyId: {
              type: Number
          },
          uuid: {
              type: String
          },
          _info: {}
      },
      state: {
          type: String
      },
      zip: {
          type: String
      },
      deletedFlag: {
          type: Boolean
      },
      activeFlag: {
          type: Boolean,
          default: true
      },
      dateDeleted: {
          type: Date
      },

      _info: {
          lastUpdated: Date,
          updatedBy: String
      },
      country: {
          id: {
              type: Number
          },
          name: {
              type: String
          },
          _info: {}
      },
      addressFormat: {
          type: String
      },
      calendar: {
          id: {
              type: Number
          },
          name: {
              type: String
          },
          _info: {}
      },
      taxCodeId: {
          type: String
      },
      phoneNumber: {
          type: String
      },
      faxNumber: {
          type: String
      },
      hoursOfOperation: {
          type: String
      },
      maintenanceWindow: {
          type: String
      },
      expenseReimbursement: {
          type: String
      },
      primaryAddressFlag: {
          type: Boolean
      },
      defaultShippingFlag: {
          type: Boolean
      },
      defaultBillingFlag: {
          type: Boolean
      },
      defaultMailingFlag: {
          type: Boolean
      },
      mobileGuid: {
          type: String
      },
      calendarId: {
          type: Number
      },
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
          ITBLastUpdated: {
              type: Date
          },
          ITBUpdatedBy: {
              type: String
          },
          server: {
              type: String
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
          }
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
      timeZone: {
          id: {
              type: Number
          },
          name: {
              type: String
          },
          _info: {}
      },
      syncFlag: {
          type: Boolean,
          default: false
      },
      ITBLastUpdated: {
          type: Date
      },
      ITBUpdatedBy: {
          type: String
      },
      searchTags: [{
          type: String
      }]
  }, {
    timestamps: true
  });
 // return mongoose.model('Location', locationSchema);
    var Location = mongoose.model('Location', locationSchema);
    var LocationHist = mongoose.model('LocationHist', locationSchema);
    return {
        Location: Location,
        LocationHist: LocationHist
    };
};
