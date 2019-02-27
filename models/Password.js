/* eslint-disable */ 
/*
##################################################################
-- Name 	        : Password.js
-- Creation Date    : 14-10-2016
-- Author           : Noman Maqsood
-- Jira Reference   : ITB-407
-- Purpose          :
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

var autoIncrement = require('mongoose-auto-increment');

"use strict";
module.exports = function(mongoose) {
    //autoIncrement.initialize(mongoose);
    var Schema = mongoose.Schema;
    var passwordSchema = new Schema({
        ITBPasswordId: {
            type: Number,
            required: true
        },
        ITBCompanyId: {
            type: Number,
            required: true
        },
        ITBCompany: {
            type: String
        },
        orgId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        lastUpdateDate: {
            type: String
        },
        changeCount: {
            type: Number,
            default: 0
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

    // passwordSchema.plugin(autoIncrement.plugin, {
    //     model: 'Password',
    //     field: 'ITBPasswordId',
    //     startAt: 1,
    //     incrementBy: 1
    // });

    //return mongoose.model('Password', passwordSchema);
    var Password= mongoose.model("Password",passwordSchema);
    var PasswordHist= mongoose.model("PasswordHist", passwordSchema);
    return{
        Password: Password,
        PasswordHist: PasswordHist
    };

};
