/* eslint-disable */
"use strict";
//var autoIncrement = require('mongoose-auto-increment'); //user models
// var encrypt = require('mongoose-encryption');
// var fs = require('fs');
// var enc_key = JSON.parse(fs.readFileSync('./privateConfig/pass_key.json', 'utf8'));
// var secret = enc_key.key;
module.exports = function(mongoose) {

  //autoIncrement.initialize(mongoose);

  var Schema = mongoose.Schema;
  var userSchema = new Schema({
    orgId: {
      type: String
    },
    MobileAuthEnabled: {
      type: Boolean,
      default: false
    },
    TvUser: {
      type: Boolean,
      default: false
    },
    SC:{
      user:{
        type:String
      },
      password:{
        type:String,
        select: false
      },
      defaultGroup:{
        type:String
      }
    },

    MobilePurgeEnabled: {
      type: Boolean,
      default: false
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    ipAddresses:[{
      from: {
        type: String,
      },
      to: {
        type: String
      }
    }
    ],
    slideViewData:[{
      categoryId: {type: String},
      tabId: {type: String},
      options: {
        rotationFlag: {type: Boolean, default:false},
        rotationTimeout: {type: Number}

      }
    }],
    smsVerificationCode: {
      type: String,
      default: null
    },
    uuid: {
      type: String,
      required: true
    },
    userId: {
      type: Number
    },
    userIdOld: {
      type: Number
    },
    userName: {
      type: String
    },
    password: {
      type: String
    },
    roleId: {
      type: Number
    },
    firstName: {
      type: String,
      es_indexed: true
    },
    noOfAttempts: {
      type: Number,
      default: 0
    },
    accountLocked: {
      type: Boolean,
      default: false
    },
    lastName: {
      type: String
    },
    dob: {
      type: String
    },
    phoneOffice: {
      type: String
    },
    phoneMobile: {
      type: String
    },
    gender: {
      type: String
    },
    address: {
      type: String
    },
    lastLogin: {
      type: String
    },
    lastLoginIpAddress: {
          type: String
      },
    timezone: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    picMode: {
      type: String,
      default: "Select Avatar"
    },
    userPhoto: {
      type: String,
      default: "data:image/png;base64,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"

    },
    userColor: {
      type: String,
      default: "#DB4A48"
    },
    firstLoginFlag: {
      type: Boolean,
      default: true
    },
    inactiveFlag: {
      type: Boolean,
      default: false
    },
    tourNotification: {
      type: Boolean,
      default: true
    },
    watchList: [],
    siteConfigs: [],
    configConfigs: [],
    contactConfigs: [],
    userListSettings: [{
      name: {
        type: String
      },
      dataTableSettings: {
        type: String
      }
    }],
    userFilters: [{
      name: {
        type: String
      },
      startDate: {
        type: String
      },
      endDate: {
        type: String
      },
      status: {
        type: String
      },
      board: {
        type: String
      },
      resources: {
        type: String
      },
      companies: {
        type: String
      },
      tags: {
        type: String
      },
      responses: {
        happy: {
          type: Boolean
        },
        poor: {
          type: Boolean
        },
        neutral: {
          type: Boolean
        }
      }
    }],
    cwCredentials: {
      cwUserName: {
        type: String
      },
      cwCompanyId: {
        type: String
      },
      cwUrl: {
        type: String
      },
      cwPassword: {
        type: String
      },
      cwEncodedUserDetail: {
        type: String
      },
      cwPublicKey: {
        type: String
      },
      cwPrivateKey: {
        type: String
      },
      cwEncodedKey: {
        type: String
      },
      cwExpiry: {
        type: String
      }
    },
    ldap: {
      user: {
        type: String
      },
      password:{
        type:String
      }
    },
    role: {
      roleId: {
        type: Number
      },
      roleName: {
        type: String
      }
    },
    companyConfigs: [],
    usersConfigs: [],
    tabs: [{
      tabName: {
        type: String
      },
      tabId: {
        type: String
      },
      icon: {
        type: String
      },
      categoryId: {
        type: Number
      },
      closedFlag: {
        type: Boolean
      },
      defaultFlag: {
        type: Boolean
      },
      widgets: [{
        widgetId: {
          type: Number
        },
        widgetName: {
          type: String
        },
        width: {
          type: Number
        },
        height: {
          type: Number
        },
        xAxis: {
          type: Number
        },
        yAxis: {
          type: Number
        },
        widgetColor: {
          type: String
        },
        widgetDirective: {
          type: String
        },
        companyFilter: {
          type: Boolean
        },
        layoutFilter: [{
          type: String
        }],
        category: {
          type: String
        },
        widgetImage: {
          type: String
        },
        compFilter:[{
          type: String
        }]
      }]
    }],
    favCompanies: [],
    favoriteCompanies: {
      type: String
    },
    menuSortOrder:{
      type:String
    },
    // menu: [{
    //     name: {
    //         type: String,
    //         required: [true, "Menu name is required field"]
    //     },
    //     route: {
    //         type: String,
    //         required: true
    //     },
    //     icon: {
    //         type: String
    //     },
    //     menuId: {
    //         type: String
    //     }
    // }],
    menu: [{
      name: {
        type: String,
        required: [true, "Section name is required field"]
      },
      menuItems:[{
        name: {
          type: String,
          required: [true, "Menu name is required field"]
        },
        route: {
          type: String,
          required: true
        },
        icon: {
          type: String
        },
        menuId: {
          type: String
        }
      }]

    }],
    layoutClassic: {
      type: Boolean,
      default: false
    },
    kbTreeViewFlagCompany:{
      type: Boolean,
      default: false
    },
    kbTreeViewFlagGlobal:{
      type: Boolean,
      default: false
    },
    googleAuthFlag: {
      type: Boolean,
      default: false
    },
    googleAuthAlgorithm:{
      ascii:{
        type: String
      },
      base32:{
        type: String
      },
      hex:{
        type: String
      },
      otpauth_url:{
        type: String
      }
    },
    updatedBy: {
      type: String
    },
    ITBLastUpdated: {
      type: Date,
      default: new Date()
    },
    ITBUpdatedBy: {
      type: String
    },
    deletedAt: {
      type: Date,
      default: null
    },
    deletedBy: {
      type: String
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
    userEmail: {
      confirmationUuid: {
        type: String
      },
      // sendtime: {
      //     type: Date
      // },
      isConfirmed: {
        type: Boolean
      }
    },
    status: {
      type: String, //"invite sent" or "invite failed" or "activated"?
      enum: ['invite sent', 'invite failed', 'activated']
    },
    userType: {
      type: String, //Internal or External user?
      enum: ['internal', 'external']
    },

    companyList: [],
    pinSideBar:{
      type: Boolean,
      default: false
    }
  }, {
	  timestamps: true
  });


 /* userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
  });*/
  // userSchema.plugin(encrypt, {
  //     secret: secret,
  //     encryptedFields: ['password']
  // });
  return mongoose.model("User", userSchema);

};