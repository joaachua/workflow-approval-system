const dotenvFlow = require("dotenv-flow");
const { cleanEnv, str, num, bool } = require("envalid");

// Load env files based on NODE_ENV (development/staging/production)
// dotenv-flow will load:
// .env, .env.local, .env.{NODE_ENV}, .env.{NODE_ENV}.local (if present)
dotenvFlow.config({
	path: process.cwd(), // backend folder
	silent: true,
});

const env = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ["development", "staging", "production", "test"],
		default: "development",
	}),

	PORT: num({ default: 5000 }),
	APP_URL: str({ default: "http://localhost:5000" }),
	FRONTEND_URL: str({ default: "http://localhost:5173" }),

	// Database
	DB_CLIENT: str({ choices: ["mysql2", "pg"], default: "mysql2" }),
	DB_HOST: str(),
	DB_PORT: num({ default: 3306 }),
	DB_NAME: str(),
	DB_USER: str(),
	DB_PASSWORD: str(),

	// Auth / Security
	JWT_SECRET: str(),
	JWT_EXPIRES_IN: str({ default: "1d" }),

	// Optional: enable extra logs
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
	},

	auth: {
		jwtSecret: env.JWT_SECRET,
		jwtExpiresIn: env.JWT_EXPIRES_IN,
	},
};
