class ExpressConfig {
	constructor() {
		this.port = process.env.EXPRESS_PORT || 8008;
	}
}

module.exports = ExpressConfig;
