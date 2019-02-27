/* eslint-disable */
"use strict";
/*
##################################################################
-- Name             : Configuration.js
-- Creation Date    : 17-5-2016
-- Author           : Abdulhaq Shah
-- Jira Reference   : ITB-27
-- Purpose          : Schema For Configurations
-- Parameters       : None
-- Returns          : None
-- Notes for Others : None
-- Reviewed By      : Abdulhaq Shah
-- Reviewed Date    : 20-5-2016
##################################################################
-- Version     Revision By    Ticket Reference     Description
--
##################################################################
*/
var autoIncrement = require('mongoose-auto-increment');
module.exports = function (mongoose) {
  // autoIncrement.initialize(mongoose);
  // var uuid = require('uuid');
  var Schema = mongoose.Schema;
  var ConfigurationSchema = new Schema({
      operationType:{
          type: String
      },
    ITBConfigurationId: {
        type: Number
    },
    alt_id: {
      type: String
    },
    ITBCompanyId: {
      type: Number
    },
    unmappedRMMConfig: {
      type: Boolean,
      default: false
    },
    uuid: {
      type: String,
    },
    mobileGuid: {
      type: String,
    },
    id: {
      type: String
    },
    syncStatus: {
      type: String,
      default: null
    },
    solarwindsNCLinks: {
      propertiesTab: String,
      statusTab: String,
      dashboard: String,
      remoteLaunchLink: String
    },
    solarwindsNCCustomProperties: [{
      defaultValue: {
        type: String
      },
      devicePropertyID: {
        type: Number
      },
      label: {
        type: String
      },
      type: {
        type: Number
      },
      value: {
        type: String
      }
    }],
    solarwindsNCSoCompany: {
      name: String,
      id: Number
    },
    solarwindsNCRemoteManagement: {
      type: Boolean,
      default: false
    },
    leaseExpiry: {
      type: Date
    },
    replacementDate: {
      type: Date
    },
    orgId: {
      type: String
    },
    labTechSync: {
      type: Boolean,
      default: false
    },
    solarwindsNCId: {
      type: Number,
      default: null
    },
    swNCSync: {
      type: Boolean,
      default: false
    },
    solarwindsNCCustomerId: {
      type: Number,
      default: null
    },
    kaseyaVSASync: {
      type: Boolean,
      default: false
    },
    kaseyaVSA_AgentId: {
      type: String
    },
    kaseyaVSA_AssetId: {
      type: String
    },
    kaseyaVSA_MachineGroupId: {
      type: String
    },
    kaseyaVSA_MachineGroup: {
      type: String
    },
    kaseyaVSA_OrgId: {
      type: String
    },
    kaseyaVSA_DeviceId: {
      type: String
    },
    aemSync: {
      type: Boolean,
      default: false
    },
    customFields: [],
    displayVendorFlag: {
      type: Boolean
    },
    name: { // config name
      type: String,
    },
    imageUrl: {
      type: String
    },
    imageDate: {
      type: Date
    },
    businessUnitId: {
      type: Number
    },
    searchTags: [{
      type: String
    }],
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
    favourite: {
      type: Boolean
    },
    favoriteIcon: {
      type: String
    },
    fileContent: {
      type: String
    },
    serviceLevelAgreement: {
      id: {
        type: Number
      },
      name: {
        type: String
      }
    },
    product: {
      id: {
        type: Number
      },
      name: {
        type: String
      }
    },
    type: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    status: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    sla: {
      id: {
        type: Number
      },
      name: {
        type: String
      },
      _info: {}
    },
    company: {
      id: {
        type: Number
      },
      identifier: {
        type: String
      },
      companyUuid: {
        type: String
      },
      name: {
        type: String
      },
      ITBCompanyId: {
        type: Number
      }
    },
    locationId: {
      type: String,
    },
    businessId: {
      type: String
    },
    deviceIdentifier: {
      type: String
    },
    serialNumber: {
      type: String
    },
    modelNumber: {
      type: String
    },
    tagNumber: {
      type: String
    },
    purchaseDate: {
      type: String
    },
    purchaseBy: {
      type: String
    },
    installationDate: {
      type: Date
    },
    installedBy: {
      id: {
        type: Number
      },
      identifier: {
        type: String
      }
    },
    warrantyExpirationDate: {
      type: Date
    },
    vendorNotes: {
      type: String
    },
    notes: {
      type: String
    },
    maintenanceWindow: {
      type: String
    },
    macAddress: {
      type: String
    },
    lastLoginName: {
      type: String
    },
    billFlag: {
      type: String
    },
    backUpSuccesses: {
      type: String
    },
    backUpIncomplete: {
      type: String
    },
    backUpFailed: {
      type: String
    },
    backUpRestores: {
      type: String
    },
    lastBackUpDate: {
      type: Date
    },
    backupServerName: {
      type: String
    },
    backupBillableSpaceGB: {
      type: String
    },
    backupProtectedDeviceList: {
      type: String
    },
    backupYear: {
      type: Number
    },
    backupMonth: {
      type: Number
    },
    ipAddress: {
      type: String
    },
    defaultGateway: {
      type: String
    },
    osType: {
      type: String
    },
    osInfo: {
      type: String
    },
    osKey: {
      type: String
    },
    osInstallDate: {
      type: String
    },
    cpuSpeed: {
      type: String
    },
    cpuCores: {
      type: String
    },
    ram: {
      type: String
    },
    localHardDrives: {
      type: String
    },
    parentConfigurationId: {
      type: String
    },
    vendor: {
      id: {
        type: String
      },
      name: {
        type: String
      },
      identifier: {
        type: String
      },
      _info: {}
    },
    _info: {
      lastUpdated: Date,
      updatedBy: String
    },
    manufacturer: {
      id: {
        type: String
      },
      name: {
        type: String
      }
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
    ///// LABTECT//////
    ComputerID: {
      type: String,
      default: null
    },
    Name: {
      type: String
    }, // device host name
    ClientID: {
      type: String,
      default: null
    },
    LocationID: {
      type: String
    },
    Domain: {
      type: String
    },
    UserName: {
      type: String
    },
    OS: {
      type: String
    },
    solarwindsNCRunningApplications: [],
    BiosName: {
      type: String
    },
    BiosVer: {
      type: String
    },
    BiosMFG: {
      type: String
    },
    BiosFlash: {
      type: String
    },
    TotalMemory: {
      type: String
    },
    LocalAddress: {
      type: String
    },
    DNSInfo: {
      type: String
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
    Version: {
      type: String
    },
    recordStatus: {
      type: String
    },
    ManagementPort: {
      type: Number
    },
    managementLink: {
      type: String
    },
    remoteLink: {
      type: String
    },
    RouterAddress: {
      type: String
    },
    LastUsername: {
      type: String
    },
    UpTime: {
      type: String
    },
    PCDate: {
      type: String
    },
    Shares: {
      type: String
    },
    WindowsUpdate: {
      type: String
    },
    AssetTag: {
      type: String
    },
    AEMDeviceUID: {
      type: String,
      default: null
    },
    AEMDeviceID: {
      type: Number,
      default: null
    },
    AEMSiteId: {
      type: Number,
      default: null
    },
    AEMSiteName: {
      type: String,
      default: null
    },
    AssetDate: {
      type: String
    },
    DateAdded: {
      type: String
    },
    LTprinters: [{
      PrinterID: {
        type: String
      },
      Name: {
        type: String
      },
      PortName: {
        type: String
      },
      ShareName: {
        type: String
      },
    }],
    processorName: {
      type: String
    },
    LTRoleName: [{
      RoleName: {
        type: String
      },
      ITBNotes: {
        type: String
      },
    }],
    LTNetworkAdap: [{
      AdapterType: {
        type: String
      },
      AdapterName: {
        type: String
      },
      IPAddress: {
        type: String
      },
      Mac: {
        type: String
      },
      Gateway: {
        type: String
      },
      notes: {
        type: String
      },
      isPrimary: {
        type: Boolean
      },
      ITBNotes: {
        type: String
      },
      CWRecord: {
        type: Boolean,
        default: false
      }
    }],
    LTDrives: [{
      DriveID: {
        type: String
      },
      Free: {
        type: String
      },
      Letter: {
        type: String
      },
      FileSystem: {
        type: String
      },
      SSD: {
        type: Boolean,
        default: false
      },
      Size: {
        type: String
      },
      VolumeName: {
        type: String
      },
      INTERNAL: {
        type: Boolean
      },
      Model: {
        type: String
      },
      ITBNotes: {
        type: String
      },
      notes: {
        type: String
      }
    }],
    LTDevices: [{
      Name: {
        type: String
      },
      DeviceType: {
        type: String
      },
      Manufacturer: {
        type: String
      },
      ITBNotes: {
        type: String
      }
    }],
    LTWarrantyInfo: [{
      WarrantyInformationId: {
        type: String
      },
      WarrantyLookupId: {
        type: String
      },
      EndDate: {
        type: String
      },
      Source: {
        type: String
      },
      warrantyText: {
        type: String
      },
      ITBNotes: {
        type: String
      },
      DefaultWarranty: {
        type: Boolean
      }
    }],
    LTInvDevices: [{
      Name: {
        type: String
      },
      PNPDeviceID: {
        type: String
      },
      Manufacturer: {
        type: String
      },
      DeviceType: {
        type: String
      },
      ITBNotes: {
        type: String
      }
    }],
    deletedAt: {
      type: Date,
      default: null
    },
    deletedBy: {
      type: String
    },
    activeFlag: {
      type: String
    },
    lastUpdated: {
      type: Date
    },
    updatedBy: {
      type: String,
      default: ""
    },
    ITBLastUpdated: {
      type: Date
    },
    ITBUpdatedBy: {
      type: String
    },
    ITBCurrNo: {
      type: Number
    },
    ITBRecordStatus: {
      type: String
    },
    ITBLastAuthorizedTimeStamp: {
      type: Date
    },
    ITAuthorizedBy: {
      type: String
    },
    syncDate: {
      type: Date
    },
    cwConfiguration: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: String
    },
    syncFlagActive: {
      type: Boolean,
      default: false
    },
    syncFlag: {
      type: Boolean,
      default: false
    },
    contact: {
      id: {
        type: String
      },
      name: {
        type: String
      },
      itb_id: {
        type: String
      }
    },
    site: {
      id: {
        type: String
      },
      name: {
        type: String
      },
      itb_id: {
        type: String
      }
    },
    questions: [{
      answerId: {
        type: Number
      },
      questionId: {
        type: Number
      },
      question: {
        type: String
      },
      answer: {
        type: String
      },
      sequenceNumber: {
        type: Number
      },
      numberOfDecimals: {
        type: Number
      },
      fieldType: {
        type: String
      },
      requiredFlag: {
        type: Boolean
      },
      inactiveFlag: {
        type: Boolean
      }
    }]

  }, {
    timestamps: true,
    timeZone: "Asia/Karachi"
  });
  // ConfigurationSchema.plugin(autoIncrement.plugin, {
  //   model: 'Configuration',
  //   field: 'ITBConfigurationId',
  //   startAt: 1,
  //   incrementBy: 1
  // });
  var Configuration = mongoose.model('Configuration', ConfigurationSchema);

    // ConfigurationSchema.operationType={
    //   type: String
    // };

  var ConfigurationHist = mongoose.model('ConfigurationHist', ConfigurationSchema);
  return {
    Configuration: Configuration,
    ConfigurationHist: ConfigurationHist
  };
};