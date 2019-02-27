/* eslint-disable */ 
"use strict";

/*
##################################################################
-- Name             : Contact.js
-- Creation Date    : 24-6-2016
-- Author           : Abdulhaq Shah
-- Jira Reference   : ITB-196
-- Purpose          : Schema of Relationship
-- Parameters       : None
-- Returns          : None
-- Notes for Others : None
-- Reviewed By      : Abdulhaq Shah
-- Reviewed Date    : 24-6-2016
##################################################################
-- Version     Revision By    Ticket Reference     Description
--
##################################################################
*/
// var autoIncrement = require('mongoose-auto-increment');

module.exports = function(mongoose){

    // autoIncrement.initialize(mongoose);
    var Schema = mongoose.Schema;
  var relationshipSchema = new Schema({
        ITBRelationshipId : {type : Number},
        orgId: {type: String},
        id : {type : Number},
        name: {type : String},
        lastUpdated: {type :Date},
        updateBy: {type :String},
        deletedAt: {type: Date, default: null},
        deletedBy: {type: String}


    },{
        timestamps: true
    });
/*    relationshipSchema.plugin(autoIncrement.plugin, {
        model: 'Relationship',
        field: 'ITBRelationshipId',
        startAt: 1,
        incrementBy: 1
    });*/

    return mongoose.model('Relationship', relationshipSchema);

};
