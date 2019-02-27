const client = require('../helpers/elasticsearch.js');
const moment = require('moment');
const util = require("util");
// const redis = require("../middlewares/Redis.js")
const currentEnv = require("../../config/config.json").currentEnv;
const es_config = require('../../privateConfig/config.json').miscConfigs.elasticsearch;
const es_index = es_config.itbsearch_Config.index;
const es_company_type = es_config.itbsearch_Config.type_companies;
const es_contact_type = es_config.itbsearch_Config.type_contacts;
const es_config_type = es_config.itbsearch_Config.type_configurations;
const es_site_type = es_config.itbsearch_Config.type_companySite;
const es_whois_type = es_config.itbsearch_Config.type_domain;
const es_password_type = es_config.itbsearch_Config.type_companypassword;
const type_ssllabs = es_config.itbsearch_Config.type_ssllabs;
const es_runbook_type = es_config.itbsearch_Config.type_runbooktemplates;
const es_knowlegbase_type = es_config.itbsearch_Config.type_runbooks;
const sendMail = require('../helpers/sendMail');
module.exports = {
    updateEsSearch: updateEsSearch,
    createEsSearch: createEsSearch,
    deleteEssearch: deleteEssearch
};
/*
function updateEsSearch(data, source) {
	return new Promise(function(resolve, reject) {
		let type = null;
		let key = null;
		let keyValue = null;
		let ITBCompanyId = null;
		let updateBody = {
			"searchName": data.name,
			"name": (data.name).toLowerCase(),
			"OpDate": moment.utc().format(),
			"orgId": data.orgId,
			"tags": data.tags
		};
		if (source === "ssl") {
			type = type_ssllabs;
			keyValue = data.id;
			ITBCompanyId = data.itbCompanyId;
			updateBody.itbCompanyId = data.itbCompanyId;
			updateBody.id = data.id;
			updateBody.expiryResponseSent = data.expiryResponseSent;
			key = "id";
		} else if (source === "whois") {
			type = es_whois_type;
			keyValue = data.id;
			updateBody.company = data.company;
			ITBCompanyId = data.company.ITBCompanyId;
			updateBody.id = data.id;
			key = "id";
        } else if (source === "company") {
			type = es_company_type;
			keyValue = data.ITBCompanyId;
			ITBCompanyId = data.ITBCompanyId;
			updateBody.identifier = data.identifier;
			updateBody.id = data.ITBCompanyId;
			key = "id";
		} else if (source === "companySite") {
			type = es_site_type;
			keyValue = data.id;
			updateBody.company = data.company;
			ITBCompanyId = data.company.ITBCompanyId;
			updateBody.id = data.id;
			key = "id";
		} else if (source === "runbook") {
			type = es_runbook_type;
			keyValue = data.id;
			updateBody.company = data.company;
			ITBCompanyId = data.company.ITBCompanyId;
			updateBody.id = data.id;
			key = "id";
		} else if (source === "knowlegbase") {
			type = es_knowlegbase_type;
			keyValue = data.id;
			if (data.companyId) {
				updateBody.companyId = data.companyId;
				ITBCompanyId = data.companyId;
			}
			updateBody.id = data.id;
			key = "id";
		} else if (source === "contact") {
			type = es_contact_type;
			keyValue = data.id;
			updateBody.company = data.company;
			updateBody.id = data.id;
			updateBody.ITBCompanyId = data.ITBCompanyId;
			ITBCompanyId = data.ITBCompanyId;
			key = "id";
		} else if (source === "configuration") {
			type = es_config_type;
			keyValue = data.id;
			updateBody.id = data.id;
			updateBody.company = data.company;
			// updateBody.ITBCompanyId = data.company.ITBCompanyId;
			ITBCompanyId = data.company.ITBCompanyId;
			updateBody.serialNumber = data.serialNumber;
			updateBody.assetTag = data.assetTag;
			updateBody.configType = data.configType;
			if (updateBody.assetTag) {
				updateBody.searchAssetTag = updateBody.assetTag;
				updateBody.assetTag = updateBody.assetTag.toLowerCase();
			}
			if (updateBody.serialNumber) {
				updateBody.searchSerialNumber = updateBody.serialNumber;
				updateBody.serialNumber = updateBody.serialNumber.toLowerCase();
			}
			key = "id";
		} else if (source === "companyPassword") {
			type = es_password_type;
			keyValue = data.id;
			updateBody.id = data.id;
			updateBody.company = data.company;
			ITBCompanyId = data.ITBCompanyId;
			updateBody.ITBCompanyId = data.ITBCompanyId;
			key = "id";
		} else {
			resolve(false);
		}
		//==============UPDATE ES================
		let searchBody = {
			"from": 0,
			"size": 1,
			"query": {
				"bool": {
					"must": {
						"match_all": {}
					},
					"filter": {
						"bool": {
							"must": []
						}
					}
				}
			}
		};
		let term = {};
		term[key] = keyValue;
		searchBody.query.bool.filter.bool.must.push({
			term: term
		});
		searchBody.query.bool.filter.bool.must.push({
			"term": {
				"orgId": data.orgId
			}
		});
		client.search({
			index: es_index,
			type: type,
			body: searchBody
		}).then(function(resp) {
			let hits = resp.hits.hits;
			if (hits.length > 0) {
				client.index({
					index: es_index,
					type: type,
					id: hits[0]._id,
					body: updateBody
				}, function(error, response) {
					if (error) {
						console.log(error)
						sendErrorEmail({
							orgId: data.orgId,
							error: error,
							function: "updateEsSearch",
							body: updateBody
						});
						// errorSaving(error, data.orgId, "update");
						resolve(false);
					} else {
						resolve(true);
					}
				});
			} else {
				//==============CREATE ES================
				client.index({
					index: es_index,
					type: type,
					body: updateBody
				}, function(error, response) {
					if (error) {
						sendErrorEmail({
							orgId: data.orgId,
							error: error,
							function: "updateEsSearch",
							body: updateBody
						});
						// errorSaving(error, data.orgId, "update");
						resolve(false);
					} else {
						// refreshRedis(data.orgId, source, ITBCompanyId, false);
						resolve(true);
					}
				});
				//=======================================
			}
		}, function(err) {
			sendErrorEmail({
				orgId: data.orgId,
				error: err,
				function: "updateEsSearch"
			});
			// errorSaving(err, data.orgId, "update");
			resolve(false);
		});
		//=======================================
	}).catch(function(err) {
		sendErrorEmail({
			orgId: data.orgId,
			error: err,
			function: "updateEsSearch"
		});
		return false;
	});
}
*/

function createEsSearch(data, source) {
    return new Promise(function(resolve, reject) {
        if (data.name) {
            let type = null;
            let key = null;
            let keyValue = null;
            let ITBCompanyId = null;
            let createBody = {
                "searchName": data.name,
                "name": (data.name).toLowerCase(),
                "OpDate": moment.utc().format(),
                "orgId": data.orgId,
                "tags": data.tags
            };
            if (!data.userPermission) {
                data.userPermission = [];
            }
            if (data.companyUuid) {
                createBody.companyUuid = data.companyUuid;
            }
            if (data.uuid) {
                createBody.uuid = data.uuid;
            }
            if (source === "ssl") {
                type = type_ssllabs;
                keyValue = data.id;
                ITBCompanyId = data.itbCompanyId;
                createBody.itbCompanyId = data.itbCompanyId;
                createBody.id = data.id;
                createBody.expiryResponseSent = data.expiryResponseSent;
                createBody.userPermission = data.userPermission;
                key = "id";
            } else if (source === "whois") {
                type = es_whois_type;
                keyValue = data.id;
                createBody.company = data.company;
                ITBCompanyId = data.company.ITBCompanyId;
                createBody.id = data.id;
                key = "id";
            } else if (source === "company") {
                type = es_company_type;
                keyValue = data.ITBCompanyId;
                ITBCompanyId = data.ITBCompanyId;
                createBody.identifier = data.identifier;
                createBody.id = data.ITBCompanyId;
                createBody.userPermission = [];
                createBody.companyUuid = data.uuid;
                for (var k in data.userPermission) {
                if (typeof(data.userPermission[k]) === 'object') {
                    createBody.userPermission.push({
                        id: data.userPermission[k].id
                    })
                } else {
                    createBody.userPermission.push({
                        id: data.userPermission[k]
                    })
                }
            }
                key = "id";
            } else if (source === "companySite") {
                type = es_site_type;
                keyValue = data.id;
                createBody.company = data.company;
                ITBCompanyId = data.company.ITBCompanyId;
                createBody.id = data.id;
                createBody.userPermission = data.userPermission
                key = "id";
            } else if (source === "runbook") {
                type = es_runbook_type;
                keyValue = data.id;
                createBody.company = data.company;
                ITBCompanyId = data.company.ITBCompanyId;
                createBody.id = data.id;
                key = "id";
            } else if (source === "knowlegbase") {
                type = es_knowlegbase_type;
                keyValue = data.id;
                if (data.companyId) {
                    createBody.companyId = data.companyId;
                    ITBCompanyId = data.companyId;
                }
                createBody.id = data.id;
                key = "id";
            } else if (source === "contact") {
                type = es_contact_type;
                keyValue = data.id;

                createBody.company = data.company;
                createBody.id = data.id;
                createBody.ITBCompanyId = data.ITBCompanyId;
                ITBCompanyId = data.ITBCompanyId;
                createBody.userPermission = data.userPermission;
                key = "id";

            } else if (source === "configuration") {
                type = es_config_type;
                keyValue = data.id;
                createBody.id = data.id;
                createBody.company = {}
                if (data.company && (data.company.id != null || typeof data.company.id != undefined)) {
                    createBody.company.id = data.company.id;
                }
                if (data.company && (data.company.ITBCompanyId != null || data.company.ITBCompanyId != undefined)) {
                    createBody.ITBCompanyId = data.company.ITBCompanyId;
                    //console.log('<<', createBody, '>>')
                    createBody.company.ITBCompanyId = data.company.ITBCompanyId;
                }
                if (data.company.name && (data.company.name != null || data.company.name != undefined)) {
                    createBody.company.name = data.company.name;
                }

                createBody.serialNumber = data.serialNumber;
                createBody.assetTag = data.assetTag;
                createBody.configType = data.configType;
                if (createBody.assetTag) {
                    createBody.searchAssetTag = createBody.assetTag;
                    createBody.assetTag = createBody.assetTag.toLowerCase();
                }
                if (createBody.serialNumber) {
                    createBody.searchSerialNumber = createBody.serialNumber;
                    createBody.serialNumber = createBody.serialNumber.toLowerCase();
                }

                createBody.userPermission = data.userPermission;
                key = "id";
            } else if (source === "companyPassword") {
                type = es_password_type;
                keyValue = data.id;
                createBody.id = data.id;
                createBody.company = {}
                createBody.company = data.company;
                createBody.ITBCompanyId = data.ITBCompanyId;
                ITBCompanyId = data.ITBCompanyId;
                createBody.userPermission = data.userPermission;
                key = "id";
            } else {
                resolve(false);
            }
            //==============CREATE ES================
            client.index({
                index: es_index,
                type: type,
                body: createBody
            }, function(error, response) {
                // console.log(response,util.inspect(createBody,false,null))
                if (error) {
                    console.log('<<<<<~', error, '<<<<<~')
                    sendErrorEmail({
                        orgId: data.orgId,
                        error: error,
                        function: "createEsSearch",
                        body: createBody
                    });
                    // errorSaving(error, data.orgId, "create");
                    resolve(false);
                } else {
                    // refreshRedis(data.orgId, source, ITBCompanyId, false);
                    resolve(true);
                }
            });
            //=======================================
        } else {
            reject(false)
        }
    }).catch(function(err) {
        console.log(err, '<<ES Creation Failed<<')
        sendErrorEmail({
            orgId: data.orgId,
            error: err,
            function: "createEsSearch"
        });
        return false;
    });
}

function updateEsSearch(data, source) {
    return new Promise(function(resolve, reject) {
        let type = null;
        let key = null;
        let keyValue = null;
        let ITBCompanyId = null;
        let updateBody = {
            "searchName": data.name,
            "name": (data.name).toLowerCase(),
            "OpDate": moment.utc().format(),
            "orgId": data.orgId,
            "tags": data.tags
        };
        if (!data.userPermission) {
            data.userPermission = [];
        }
        if (data.companyUuid) {
            updateBody.companyUuid = data.companyUuid;
        }
        if (data.uuid) {
            updateBody.uuid = data.uuid;
        }
        if (source === "ssl") {
            type = type_ssllabs;
            keyValue = data.id;
            ITBCompanyId = data.itbCompanyId;
            updateBody.itbCompanyId = data.itbCompanyId;
            updateBody.id = data.id;
            updateBody.expiryResponseSent = data.expiryResponseSent;
            updateBody.userPermission = data.userPermission;
            key = "id";
        } else if (source === "whois") {
            type = es_whois_type;
            keyValue = data.id;
            updateBody.company = data.company;
            ITBCompanyId = data.company.ITBCompanyId;
            updateBody.id = data.id;
            key = "id";
        } else if (source === "company") {
            type = es_company_type;
            keyValue = data.ITBCompanyId;
            ITBCompanyId = data.ITBCompanyId;
            updateBody.identifier = data.identifier;
            updateBody.id = data.ITBCompanyId;
            updateBody.companyUuid = data.uuid;
            updateBody.userPermission = [];
            for (var k in data.userPermission) {
                if (typeof(data.userPermission[k]) === 'object') {
                    updateBody.userPermission.push({
                        id: data.userPermission[k].id
                    })
                } else {
                    updateBody.userPermission.push({
                        id: data.userPermission[k]
                    })
                }
            }
            key = "id";
        } else if (source === "companySite") {
            // console.log(123)
            type = es_site_type;
            keyValue = data.id;
            updateBody.company = data.company;
            ITBCompanyId = data.company.ITBCompanyId;
            updateBody.id = data.id;
            updateBody.userPermission = data.userPermission
            key = "id";
        } else if (source === "runbook") {
            type = es_runbook_type;
            keyValue = data.id;
            updateBody.company = data.company;
            ITBCompanyId = data.company.ITBCompanyId;
            updateBody.id = data.id;
            key = "id";
        } else if (source === "knowlegbase") {
            type = es_knowlegbase_type;
            keyValue = data.id;
            if (data.companyId) {
                updateBody.companyId = data.companyId;
                ITBCompanyId = data.companyId;
            }
            updateBody.id = data.id;
            key = "id";
        } else if (source === "contact") {
            type = es_contact_type;
            keyValue = data.id;
            updateBody.company = data.company;
            updateBody.id = data.id;
            updateBody.ITBCompanyId = data.ITBCompanyId;
            ITBCompanyId = data.ITBCompanyId;
            key = "id";
            updateBody.userPermission = data.userPermission
        } else if (source === "configuration") {
            type = es_config_type;
            keyValue = data.id;
            updateBody.id = data.id;
            updateBody.company = {}
            if (data.company.id != null || data.company.id != undefined) {
                updateBody.company.id = data.company.id;
            }
            if (data.company.ITBCompanyId != null || data.company.ITBCompanyId != undefined) {
                updateBody.ITBCompanyId = data.company.ITBCompanyId;
                updateBody.company.ITBCompanyId = data.company.ITBCompanyId;
            }
            if (data.company.name && (data.company.name != null || data.company.name != undefined)) {
                updateBody.company.name = data.company.name;
            }
            if (data.assetTag) { //Handling
                updateBody.assetTag = data.assetTag; //for Update
            } //By
            if (data.serialNumber) { //Query
                updateBody.serialNumber = data.serialNumber;
            }
            if (data.configType) {
                updateBody.configType = data.configType;
            }
            if (updateBody.assetTag) {
                updateBody.searchAssetTag = updateBody.assetTag;
                updateBody.assetTag = updateBody.assetTag.toLowerCase();
            }
            if (updateBody.serialNumber) {
                updateBody.searchSerialNumber = updateBody.serialNumber;
                updateBody.serialNumber = updateBody.serialNumber.toLowerCase();
            }
            updateBody.userPermission = data.userPermission;
            key = "id";
        } else if (source === "companyPassword") {
            type = es_password_type;
            keyValue = data.id;
            updateBody.id = data.id;
            updateBody.company = {}
            updateBody.company = data.company;
            ITBCompanyId = data.ITBCompanyId;
            updateBody.ITBCompanyId = data.ITBCompanyId;
            updateBody.userPermission = data.userPermission;
            key = "id";
        } else {
            resolve(false);
        }
        //==============UPDATE ES================
        let searchBody = {
            "from": 0,
            "size": 1,
            "query": {
                "bool": {
                    "must": {
                        "match_all": {}
                    },
                    "filter": {
                        "bool": {
                            "must": []
                        }
                    }
                }
            }
        };
        let term = {};
        term[key] = keyValue;
        searchBody.query.bool.filter.bool.must.push({
            term: term
        });
        searchBody.query.bool.filter.bool.must.push({
            "term": {
                "orgId": data.orgId
            }
        });
        client.search({
            index: es_index,
            type: type,
            body: searchBody
        }).then(function(resp) {
            let hits = resp.hits.hits;
            if (hits.length > 0) {
                client.index({
                    index: es_index,
                    type: type,
                    id: hits[0]._id,
                    body: updateBody
                }, function(error, response) {
                    //   console.log(response,util.inspect(updateBody,false,null))
                    if (error) {
                        sendErrorEmail({
                            orgId: data.orgId,
                            error: error,
                            function: "updateEsSearch",
                            body: updateBody
                        });
                        // errorSaving(error, data.orgId, "update");
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            } else {
                //==============CREATE ES================
                client.index({
                    index: es_index,
                    type: type,
                    body: updateBody
                }, function(error, response) {
                    //  console.log(response,util.inspect(updateBody,false,null))
                    if (error) {
                        sendErrorEmail({
                            orgId: data.orgId,
                            error: error,
                            function: "updateEsSearch",
                            body: updateBody
                        });
                        // errorSaving(error, data.orgId, "update");
                        resolve(false);
                    } else {
                        // refreshRedis(data.orgId, source, ITBCompanyId, false);
                        resolve(true);
                    }
                });
                //=======================================
            }
        }, function(err) {
            sendErrorEmail({
                orgId: data.orgId,
                error: err,
                function: "updateEsSearch"
            });
            // errorSaving(err, data.orgId, "update");
            resolve(false);
        });
        //=======================================
    }).catch(function(err) {
        sendErrorEmail({
            orgId: data.orgId,
            error: err,
            function: "updateEsSearch"
        });
        return false;
    });
}

function deleteEssearch(data, source) {
    return new Promise(function(resolve, reject) {
        let type = null;
        let key = null;
        let ITBCompanyId = data.ITBCompanyId;
        let keyValue = null;
        if (source === "ssl") {
            type = type_ssllabs;
            keyValue = data.id;
            key = "id";
        } else if (source === "whois") {
            type = es_whois_type;
            keyValue = data.id;
            key = "id";
        } else if (source === "company") {
            type = es_company_type;
            keyValue = data.ITBCompanyId;
            key = "id";
        } else if (source === "companySite") {
            type = es_site_type;
            keyValue = data.id;
            key = "id";
        } else if (source === "runbook") {
            type = es_runbook_type;
            keyValue = data.id;
            key = "id";
        } else if (source === "knowlegbase") {
            type = es_knowlegbase_type;
            keyValue = data.id;
            key = "id";
        } else if (source === "contact") {
            type = es_contact_type;
            keyValue = data.id;
            key = "id";
        } else if (source === "configuration") {
            type = es_config_type;
            keyValue = data.id;
            key = "id";
        } else if (source === "companyPassword") {
            type = es_password_type;
            keyValue = data.id;
            key = "id";
        } else {
            resolve(false);
        }
        //==============DELETE ES================
        let deleteBody = {
            "query": {
                "bool": {
                    "must": []
                }
            }
        };
        let term = {};
        term[key] = keyValue;
        deleteBody.query.bool.must.push({
            "match_phrase": term
        });
        deleteBody.query.bool.must.push({
            "match_phrase": {
                "orgId": data.orgId
            }
        });
        client.deleteByQuery({
            index: es_index,
            type: type,
            body: deleteBody
        }, function(error, response) {
            if (error) {
                sendErrorEmail({
                    orgId: data.orgId,
                    error: error,
                    function: "deleteEssearch",
                    body: deleteBody
                });
                // errorSaving(error, data.orgId, "delete");
                resolve(false);
            } else {
                // refreshRedis(data.orgId, source, ITBCompanyId, true);
                resolve(true)
            }
        });
        //=======================================
    }).catch(function(err) {
        sendErrorEmail({
            orgId: data.orgId,
            error: err,
            function: "deleteEssearch"
        });
        return false;
    });
}

function sendErrorEmail(data) {
    if (currentEnv === "cluster") {
        let error = data.error;
        let body = data.body;
        if (error) {
            error = util.inspect(error, false, null);
        }
        if (body) {
            body = util.inspect(body, false, null)
        } else {
            body = "";
        }
        let info = {
            email: "notifications@itboost.com",
            subject: "ElasticSearch Search API Error - orgId : " + data.orgId,
            html: "<p>Function is  : " + data.function+"<br>Error is : " + error + "<br>Body if available : " + body + "</p>"
        }
        //sendMail(info);
    }
}