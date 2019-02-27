/* eslint-disable */ 
/*
##################################################################
-- Name 	         : Company.js
-- Creation Date    : 20-05-2016
-- Author           : Noman Maqsood
-- Jira Reference   : ITB-12
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

"use strict";
module.exports = function(mongoose){
   // autoIncrement.initialize(mongoose);
    var Schema = mongoose.Schema;
    var whoisSchema = new Schema({
        operationType: {
            type: String
        },
        orgId: {
            type: String
        },
        ITBCompanyId: {
            type: Number
        },
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
    },{
        timestamps: true
    });

    // whoisSchema.plugin(autoIncrement.plugin, {
    //     model: 'Whois',
    //     field: 'ITBWhoisId',
    //     startAt: 1,
    //     incrementBy: 1
    // });

    //return mongoose.model('Whois', whoisSchema);
    var Whois= mongoose.model('Whois', whoisSchema );
    var WhoisHist= mongoose.model('WhoisHist', whoisSchema );
    return{
        Whois:Whois,
        WhoisHist:WhoisHist
    }

};
