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
"use strict";
module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    //var Any = new Schema({ any: [Schema.Types.Mixed] });
    const Any = new Schema({ any: Object });
    //var generalSchema = new Schema({})
    var General= mongoose.model('General', Any);

    return{
        General:General
    }

};
