const config = require("./index");
const path = require("path");

const base = {
	client: config.db.client,
	connection: {
		host: config.db.host,
		port: config.db.port,
		database: config.db.name,
		user: config.db.user,
		password: config.db.password,
	},
	pool: config.db.pool,
	migrations: {
		directory: path.join(__dirname, "../database/migrations"),
	},
	seeds: {
		directory: path.join(__dirname, "../database/seeds"),
	},
};

module.exports = {
	localhost: base,
	development: base,
	staging: base,
	production: base,
};