'use strict';
const ExpressConfig = require('./libs/ExpressConfig');
const MongoConfig = require('./libs/MongoConfig');
const Constants = require('./libs/Constants');
class Config {
	constructor() {
		this.express = new ExpressConfig();
		this.db = new MongoConfig();
		this.constants = new Constants();
	}

	get run() {
		return require(this.constants.runPath);
	}
}
module.exports = new Config();
