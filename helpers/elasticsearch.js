/* eslint-disable */
let AWS = require('aws-sdk');
let options = {};
const elasticsearch = require('elasticsearch');
const config = require("../../privateConfig/config.json").miscConfigs.elasticsearch;
if (config.aws) {
	options = {
		host: (config.elasticsearchServers).split(","),
		// log: 'trace',
		connectionClass: require('http-aws-es'),
		awsConfig: new AWS.Config({
			region: config.region,
			credentials: new AWS.Credentials(config.aws_access_key_id, config.aws_secret_access_key)
		}),
		apiVersion: '5.5'
	};
} else {
	options = {
		host: (config.elasticsearchServers).split(","),
		// log: 'trace',
		sniffOnStart: true,
		sniffInterval: 5000,
		sniffOnConnectionFault: true,
		apiVersion: '5.5'
	}
}
const client = new elasticsearch.Client(options);
module.exports = client;