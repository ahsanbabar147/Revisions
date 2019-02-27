(function () {
  "use strict";
  const fs = require("fs");
  const models = require("../models");
  var services = {};
  fs.readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
      var cd = file.replace(".js", "");
      services[cd] = require("./" + file);
    });
  module.exports = services;
})();