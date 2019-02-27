(function () {
  "use strict";
  const fs = require("fs");
  const mongoose = require('mongoose');
  var models = {};
  fs.readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
      var cd = file.replace(".js", "");
      models[cd] = require("./" + file)(mongoose);
    });
  module.exports = models;
})();