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
 // autoIncrement.initialize(mongoose);
  var Schema = mongoose.Schema;
  var companySchema = new Schema({
      operationType:{
          type: String
      },
      User:{
          userName: String,
          userId: String
      },
    ITBCompanyId: {
      type: Number
    },
    resource: {
      id: Number,
      name: String
    },
    ITBCompanyIdOld: {
      type: Number
    },
    solarwindsNCId: {
      type: Number,
      default: null
    },
    swNCSync: {
      type: Boolean,
      default: false
    },
    kaseyaVSAId: {
      type: Number,
      default: null
    },
    kaseyaVSASync: {
      type: Boolean,
      default: false
    },
    alt_id: {
      type: String
    },
    orgId: {
      type: String
    },
    id: {
      type: String,
      default: null
    },
    uuid: {
      type: String
    },
    mobileGuid: {
      type: String
    },
    syncStatus: {
      type: String,
      default: null
    },
    tags: [],
    AEMCompanyId: {
      type: Number
    },
    AEMSync: {
      type: Boolean,
      default: false
    },
    labtechId: {
      type: Number
    },
    identifier: {
      type: String,
      maxLength: 25
    },
    name: {
      type: String,
      maxLength: 50
    },
    addressLine1: {
      type: String,
      maxLength: 50
    },
    clientOverview: {
      type: String
    },
    supportScopeSummary: {
      type: String
    },
    documents: [{
      id: {
        type: String
      },
      title: {
        type: String
      },
      fileName: {
        type: String
      },
      serverFileName: {
        type: String
      },
      owner: {
        type: String
      },
      linkFlag: {
        type: String
      },
      imageFlag: {
        type: String
      },
      publicFlag: {
        type: String
      },
      readOnlyFlag: {
        type: String
      },
      _info: {}
    }],
    addressLine2: {
      type: String
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
    favourite: {
      type: Boolean,
      default: false
    },
    billToCompany: {
      name: {
        type: String
      },
      id: {
        type: String
      }
    },
    favoriteIcon: {
      type: String
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
    sicCode: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    phoneNumber: {
      type: String
    },
    faxNumber: {
      type: String
    },
    website: {
      type: String
    },
    territoryId: {
      type: String
    },
    marketId: {
      type: String
    },
    accountNumber: {
      type: String
    },
    defaultContactId: {
      type: Number
    },
    defaultContact: {
      id: {
        type: String
      },
      name: {
        type: String
      },
      _info: {}
    },
    dateAcquired: {
      type: String
    },
    parentCompany: {
      id: {
        type: Number
      },
      identifier: {
        type: String
      },
      name: {
        type: String
      },
      _info: {
        company_href: {
          type: String
        }
      }
    },
    annualRevenue: {
      type: Number
    },
    numberOfEmployees: {
      type: Number
    },
    ownershipType: {
      id: {
        type: String
      },
      name: {
        type: String
      },
      _info: {}
    },
    //accountManager and prefferedtech added by Awais
    accountManagerId: {
      type: String
    },
    leadSource: {
      type: String
    },
    leadFlag: {
      type: Boolean
    },
    unsubscribeFlag: {
      type: Boolean
    },
    prefferedtechId: {
      type: String
    },
    companyType: {
      id: {
        type: String
      },
      name: {
        type: String
      }
    },
    classification: {
      id: {
        type: String
      },
      name: {
        type: String
      }
    },
    status: {
      id: {
        type: Number,
        maxLength: 32
      },
      name: {
        type: String,
        maxLength: 25
      },
      _info: {}
    },
    type: {
      id: {
        type: Number,
        maxLength: 32
      },
      name: {
        type: String,
        maxLength: 25
      },
      _info: {}
    },
    site: {
      type: String
    },
    timeZone: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
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
    companyNote: [{
      id: {
        type: String
      },
      text: {
        type: String
      },
      noteType: {
        id: {
          type: String
        },
        name: {
          type: String
        },
        _info: {},
      },
      flagged: {
        type: Boolean
      },
      enteredBy: {
        type: String
      },
      _info: {}
    }],
    companySite: [{
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
    }],
    agreement: [{}],
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
      startDate: {
        type: String
      },
      summary: {
        type: String
      },
      endDate: {
        type: String
      },
      deletedAt: {
        type: Date
      },
      createdAt: {
        type: Date
      },
      createdBy: {
        type: String
      },
      noteType: {
        type: String
      },
      updatedAt: [{
        type: Date
      }],
      deleteFlag: {
        type: Boolean
      },
      deletedBy: {
        type: String
      },
      editedBy: [{
        type: String
      }]
    }],
    contact: [{
      alt_id: {
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
    }],
    whois: [{
      userUpdated: {
        type: Boolean,
        default: false
      },
      uuid: {
        type: String

      },
      syncCronOperation: {
        type: Date
      },
      alt_id: {
        type: String
      },
      ITBLastUpdated: {
        type: Date
      },
      ITBUpdatedBy: {
        type: String
      },
      deletedAt: {
        type: String
      },
      deletedBy: {
        type: String
      },
      // Expity email sent or not flag
      expiryResponseSent: {
        type: Boolean
      },
      id: {
        type: String
      },
      domainName: {
        type: String
      },
      whois_server: {
        type: String
      },
      whois_updatedAt: {
        type: String
      },
      updated_date: {
        type: String
      },
      creation_date: {
        type: String
      },
      expiration_date: {
        type: String
      },
      registrar: {
        type: String
      },
      emails: {
        type: String
      },
      status: {
        type: String
      },
      registered: {
        type: Boolean
      },
      available: {
        type: Boolean
      },
      nameservers: [{
        name: {
          type: String
        },
        ipv4: {
          type: String
        },
        ipv6: {
          type: String
        }
      }],
      contact: {
        registrant: {
          name: {
            type: String
          },
          email: {
            type: String
          },
          phone: {
            type: String
          },
          fax: {
            type: String
          },
          organization: {
            type: String
          },
          country: {
            type: String
          },
          city: {
            type: String
          },
          state: {
            type: String
          },
          address: {
            type: String
          },
          zip: {
            type: String
          },
          country_code: {
            type: String
          },
          url: {
            type: String
          },
          created_on: {
            type: String
          },
          updated_on: {
            type: String
          },
          id: {
            type: String
          },
          type: {
            type: String
          }
        },
        technical: {
          name: {
            type: String
          },
          email: {
            type: String
          },
          phone: {
            type: String
          },
          fax: {
            type: String
          },
          organization: {
            type: String
          },
          country: {
            type: String
          },
          city: {
            type: String
          },
          state: {
            type: String
          },
          address: {
            type: String
          },
          zip: {
            type: String
          },
          country_code: {
            type: String
          },
          url: {
            type: String
          },
          created_on: {
            type: String
          },
          updated_on: {
            type: String
          },
          id: {
            type: String
          },
          type: {
            type: String
          }
        },
        admin: {
          name: {
            type: String
          },
          email: {
            type: String
          },
          phone: {
            type: String
          },
          fax: {
            type: String
          },
          organization: {
            type: String
          },
          country: {
            type: String
          },
          city: {
            type: String
          },
          state: {
            type: String
          },
          address: {
            type: String
          },
          zip: {
            type: String
          },
          country_code: {
            type: String
          },
          url: {
            type: String
          },
          created_on: {
            type: String
          },
          updated_on: {
            type: String
          },
          id: {
            type: String
          },
          type: {
            type: String
          }
        },
      },
      searchTags: [{
        type: String
      }],
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
      }]
    }],
    _info: {
      lastUpdated: Date,
      updatedBy: String
    },
    deletedAt: {
      type: Date,
      default: null
    },
    deletedBy: {
      type: String
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
    ITBcurrno: {
      type: Number
    },

    userDefinedField1: {
      type: String
    },
    userDefinedField2: {
      type: String
    },
    userDefinedField3: {
      type: String
    },
    userDefinedField4: {
      type: String
    },
    userDefinedField5: {
      type: String
    },
    userDefinedField6: {
      type: String
    },
    userDefinedField7: {
      type: String
    },
    userDefinedField8: {
      type: String
    },
    userDefinedField9: {
      type: String
    },
    userDefinedField10: {
      type: String
    },
    vendorIdentifier: {
      type: String
    },
    taxIdentifier: {
      type: String
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
    ITBLastUpdated: {
      type: Date
    },
    ITBUpdatedBy: {
      type: String
    },
    cwCompany: {
      type: Boolean,
      default: false
    },
    syncDate: {
      type: Date
    },
    createdBy: {
      type: Date
    },
    searchTags: [{
      type: String
    }],
    updatedBy: {
      type: String
    },
    syncFlag: {
      type: Boolean,
      default: false
    },
    currency: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      symbol: {
        type: String
      },
      isoCode: {
        type: String
      },
      _info: {}
    },
    billingSite: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    billingTerms: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    invoiceTemplate: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    pricingSchedule: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    companyEntityType: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    invoiceCCEmailAddress: {
      type: String
    },
    invoiceDeliveryMethod: {
      id: {
        type: Number
      },
      name: {
        type: String
      }
    },
    billingContact: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    territoryManager: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      identifier: {
        type: String
      },
      _info: {}
    },
    taxCode: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
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
    kbFolder: [{

      parent: {
        name: {
          type: String
        },
        icon: {
          type: String
        },
        description: {
          type: String
        },
        type: {
          type: String
        },
        child: [{
          name: {
            type: String
          },
          description: {
            type: String
          },
          type: {
            type: String
          },
          companyId: {
            type: Number
          },
          favourite: {
            type: Boolean
          },
          active: {
            type: Boolean
          },
          status: {
            type: String
          },
          createdAt: {
            type: String
          },
          lastUpdated: {
            type: String
          },
          lastUpdatedBy: {
            type: String
          },
          uuid: {
            type: String
          },
          child: [{
            name: {
              type: String
            },
            description: {
              type: String
            },
            type: {
              type: String
            },
            companyId: {
              type: Number
            },
            favourite: {
              type: Boolean
            },
            active: {
              type: Boolean
            },
            status: {
              type: String
            },
            createdAt: {
              type: String
            },
            lastUpdated: {
              type: String
            },
            lastUpdatedBy: {
              type: String
            },
            uuid: {
              type: String
            },
            child: [{
              name: {
                type: String
              },
              description: {
                type: String
              },
              type: {
                type: String
              },
              favourite: {
                type: Boolean
              },
              companyId: {
                type: Number
              },
              active: {
                type: Boolean
              },
              status: {
                type: String
              },
              createdAt: {
                type: String
              },
              lastUpdated: {
                type: String
              },
              lastUpdatedBy: {
                type: String
              },
              uuid: {
                type: String
              }
            }],
          }],
        }],
      },
    }],
  }, {
    timestamps: true
  });
  // companySchema.plugin(autoIncrement.plugin, {
  //   model: 'Company',
  //   field: 'ITBCompanyId',
  //   startAt: 1,
  //   incrementBy: 1
  // });
  //return mongoose.model('Company', companySchema);
    var Company= mongoose.model('Company', companySchema);
    var CompanyHist= mongoose.model('CompanyHist', companySchema);
    return{
        Company:Company,
        CompanyHist:CompanyHist
    }

};