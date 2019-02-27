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
var autoIncrement = require('mongoose-auto-increment');
var uuid = require('uuid');
"use strict";
module.exports = function(mongoose) {
//  autoIncrement.initialize(mongoose);
  var Schema = mongoose.Schema;
  var contactSchema = new Schema({
      operationType:{
          type: String
      },
      ITBCompanyId: {
          type: Number
      },
      alt_id: {
          type: String
      },
      address: {
          type: String
      },
      extension: {
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
      orgId: {
          type: String
      },
      communicationItems: [],
      syncStatus: {
          type: String,
          default: null
      },
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
      inactiveFlag: {
          type: Boolean
      },
      cwContact: {
          type: Boolean,
          default: false
      },
      syncDate: {
          type: Date
      },
      defaultMergeContactId: {
          type: Number
      },
      securityIdentifier: {
          type: String
      },
      managerContactId: {
          type: Number
      },
      assistantContactId: {
          type: Number
      },
      tags: [],
      id: {
          type: Number,
          default: null
      },
      firstName: {
          type: String,
          maxLength: 30
      },
      lastName: {
          type: String
      },
      siteName: {
          type: String
      },
      addressLine1: {
          type: String
      },
      addressLine2: {
          type: String
      },
      primaryContact: {
          type: Boolean,
          default: false
      },
      city: {
          type: String
      },
      state: {
          type: String
      },
      zip: {
          type: String
      },
      country: {
          type: String
      },
      title: {
          type: String
      },
      fax: {
          type: String
      },
      school: {
          type: String
      },
      marriedFlag: {
          typr: Boolean
      },
      childrenFlag: {
          type: Boolean
      },
      significantOther: {
          type: String
      },
      portalPassword: {
          type: String
      },
      portalSecurityLevel: {
          type: Number
      },
      disablePortalLoginFlag: {
          type: Boolean
      },
      unsubscribeFlag: {
          type: Boolean
      },
      nickName: {
          type: String
      },
      phoneDirect: {
          type: String
      },
      invoiceToEmailAddress: {
          id: {
              type: Number
          },
          name: {
              type: String
          },
          _info: {}
      },
      phoneMobile: {
          type: String
      },
      phoneNumber: {
          type: String
      },
      emailHome: {
          type: String
      },
      emailPrivate: {
          type: String
      },
      phoneHome: {
          type: String
      },
      phonePager: {
          type: String
      },
      relationship: {
          id: {
              type: Number
          },
          name: {
              type: String
          },
          _info: {}
      },
      contactType: {
          id: {
              type: Number
          },
          name: {
              type: String
          },
          description: {
              type: String
          }
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
      department: {
          id: {
              type: String
          },
          name: {
              type: String
          },
          _info: {}
      },
      imageURL: {
          type: String
      },
      email: {
          type: String
      },
      status: {
          type: String
      },
      mobile: {
          type: String
      },
      gender: {
          type: String
      },
      birthday: {
          type: Date
      },
      anniversary: {
          type: String
      },
      mobileGuid: {
          type: String
      },
      defaultBillingFlag: {
          type: Boolean
      },
      defaultFlag: {
          type: Boolean
      },
      facebookUrl: {
          type: String
      },
      linkedInUrl: {
          type: String
      },
      twitterUrl: {
          type: String
      },
      lastUpdated: {
          type: Date
      },
      presence: {
          type: String
      },
      site: {
          id: {
              type: String
          },
          name: {
              type: String
          },
          _info: {}
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
      _info: {
          lastUpdated: {
              type: String
          },
          updatedBy: {
              type: String
          }
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
      customFields: [{
          id: {
              type: Number
          },
          caption: {
              type: String
          },
          type: {
              type: String
          },
          entryMethod: {
              type: String
          },
          numberOfDecimals: {
              type: Number
          },
          value: {
              type: String
          }
      }],
      searchTags: [{
          type: String
      }],
  }, {
    timestamps: true
  });

 // return mongoose.model('Contact', contactSchema);
    var Contact = mongoose.model('Contact', contactSchema);
    var ContactHist = mongoose.model('ContactHist', contactSchema);
    return {
        Contact: Contact,
        ContactHist: ContactHist
    };
};