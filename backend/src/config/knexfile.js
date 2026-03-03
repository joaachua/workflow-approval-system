const config = require(".");

module.exports = {
	client: config.db.client,
	connection: {
		host: config.db.host,
		port: config.db.port,
		database: config.db.name,
		user: config.db.user,
		password: config.db.password,
	},
	migrations: {
		directory: "./src/database/migrations",
	},
	seeds: {
		directory: "./src/database/seeds",
	},
};
