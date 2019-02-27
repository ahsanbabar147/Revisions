/* eslint-disable */ 
"use strict";
//var autoIncrement = require('mongoose-auto-increment');
module.exports = function(mongoose){

  //  autoIncrement.initialize(mongoose);

    var Schema = mongoose.Schema;
  	var tokenSchema = new Schema({
	  	tokenId: { type: Number, required: true, unique: true },
        token : {type: String, required: true},
        orgId: {type: String},
        userName: {type: String},
        userId: {type: Number},
        ipAddress: {type: String},
        tokenExpiry : {type: Date, required: true},
        createdBy: {
            type: String
        },
        updatedBy: {
            type: String
        },
        deletedBy: {type: String},
        deletedAt: {type: Date, default: null},
	},{
        timestamps: true
    });

/*
    tokenSchema.plugin(autoIncrement.plugin, {
        model: 'Token',
        field: 'tokenId',
        startAt: 1,
        incrementBy: 1
    });
*/

    return mongoose.model('Token', tokenSchema);
};
