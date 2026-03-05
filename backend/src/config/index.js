const dotenvFlow = require("dotenv-flow");
const { cleanEnv, str, num, bool } = require("envalid");
const path = require("path");

// Ensure NODE_ENV exists before dotenv-flow decides which files to load
process.env.NODE_ENV = process.env.NODE_ENV || "localhost";

// Load .env files FIRST
dotenvFlow.config({
	path: path.resolve(__dirname, "../../"), // backend folder
	node_env: process.env.NODE_ENV, // use NODE_ENV
	silent: false,
	debug: true,
});

// THEN validate env (now it includes .env.localhost values)
const env = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ["development", "staging", "production", "localhost"],
		default: "localhost",
	}),

	PORT: num({ default: 5000 }),
	APP_URL: str({ default: "http://localhost:5000" }),
	FRONTEND_URL: str({ default: "http://localhost:5173" }),

	// Database (PG defaults since you're using pg)
	DB_CLIENT: str({ choices: ["mysql2", "pg"], default: "pg" }),
	DB_HOST: str({ default: "127.0.0.1" }),
	DB_PORT: num({ default: 5432 }),
	DB_NAME: str({ default: "workflow_db" }),
	DB_USER: str({ default: "joannachua" }),
	DB_PASSWORD: str({ default: "" }),

	DB_POOL_MIN: num({ default: 2 }),
	DB_POOL_MAX: num({ default: 10 }),

	JWT_SECRET: str({ default: "" }),
	JWT_EXPIRES_IN: str({ default: "1d" }),

	DEBUG: bool({ default: false }),
});

module.exports = {
	nodeEnv: env.NODE_ENV,
	port: env.PORT,
	appUrl: env.APP_URL,
	frontendUrl: env.FRONTEND_URL,
	debug: env.DEBUG,

	db: {
		client: env.DB_CLIENT,
		host: env.DB_HOST,
		port: env.DB_PORT,
		name: env.DB_NAME,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		pool: {
			min: env.DB_POOL_MIN,
			max: env.DB_POOL_MAX,
		},
	},

	auth: {
		jwtSecret: env.JWT_SECRET,
		jwtExpiresIn: env.JWT_EXPIRES_IN,
	},
};
