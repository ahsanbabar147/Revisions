"use strict";
module.exports = function (mongoose) {
  let DocRevisionSchema = new mongoose.Schema({
    data: {}
  });
  return mongoose.model('DocRevision', DocRevisionSchema);
};