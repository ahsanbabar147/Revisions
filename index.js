(function () {
	"use strict";

	const cluster = require('cluster');
	const colors = require('colors');
	const express = require("express");
	const mongoose = require('mongoose');
	const services = require('./services');
	let app = express();
	const models = require("./models");
	const async = require('async');

	// const {ReplSet} = require('mongodb-topology-manager');
	// const bind_ip = '192.168.20.24';
	// /* Starts a 3-node replica set on ports 31000, 31001, 31002, replica set name is "rs0". */
	// const replSet = new ReplSet('mongod', [
	//   { options: { port: 27017, dbpath: `${__dirname}/data/db/31000`, bind_ip } },
	//   { options: { port: 27017, dbpath: `${__dirname}/data/db/31001`, bind_ip } }
	// ], { replSet: 'staging' });
	//
	// /* Initialize the replica set. */
	// await replSet.purge();
	// await replSet.start();
	// console.log(new Date(), 'Replica set started...');

	/************************* connect to the replica set. *************************/
		// const uri = 'mongodb://192.168.20.24:27017,192.168.20.25:27017/ITBOOSTPROD_US?replicaSet=staging';
	let uri = null
	const privateConfig = require("../privateConfig/config.json");
	const currentEnv = require("../config/config.json").currentEnv;
	const config = privateConfig[currentEnv];


		if (config.dbUser == "" && config.dbPassword == "") {
			uri = "mongodb://" + config.servers + "/" + config.dbName + "?replicaSet=" + config.replicaSet;
		} else {
			uri = "mongodb://" + config.dbUser + ":" + config.dbPassword + "@" + config.servers + "/" + config.dbName + "?replicaSet=" + config.replicaSet + "&authSource=admin";
		}
		console.log("Mongo Host URL: ", uri);
		mongoose.connect(uri, {useNewUrlParser: true}).then(client => {
			console.log("Connected correctly to server");
			console.log("Host: ", client.connections[0].host);
			console.log("DB: ", client.connections[0].name);
			Object.keys(services).forEach(function (service) {
				require('./services/' + service)(models);
				// callback()
			});
		});
		app.use(express.static(__dirname));
		app.listen(config.R2ServerPort);
		console.log("App is listen at port: ", config.R2ServerPort);
		app.get('/', function (req, res) {
			res.send("###~~~~ Revisions Server ~~~~###");
		});
})
();
