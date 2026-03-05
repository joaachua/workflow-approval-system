const db = require("../config/db");

const TABLE = "users";

async function createUser(data, trx = db) {
	const rows = await trx(TABLE).insert(data).returning("*");
	return rows[0];
}

async function findById(id, trx = db) {
	return trx(TABLE).where({ id }).first();
}

async function findByEmail(email, trx = db) {
	return trx(TABLE).whereRaw("LOWER(email) = LOWER(?)", [email]).first();
}

async function findByUsername(username, trx = db) {
	return trx(TABLE).whereRaw("LOWER(username) = LOWER(?)", [username]).first();
}

async function updateUser(id, data, trx = db) {
	const rows = await trx(TABLE).where({ id }).update(data).returning("*");
	return rows[0];
}

async function deleteUser(id, trx = db) {
	// returns count
	return trx(TABLE).where({ id }).del();
}

async function listUsers({ page = 1, perPage = 10 } = {}, trx = db) {
	const p = Math.max(parseInt(page, 10) || 1, 1);
	const pp = Math.min(Math.max(parseInt(perPage, 10) || 10, 1), 100);
	const offset = (p - 1) * pp;

	const baseQuery = trx(TABLE).select(
		"id",
		"username",
		"full_name",
		"email",
		"created_at"
	);

	const [items, countResult] = await Promise.all([
		baseQuery.clone().orderBy("id", "desc").limit(pp).offset(offset),
		trx(TABLE).count("* as total").first(),
	]);

	const total = parseInt(countResult?.total ?? "0", 10);

	return {
		items,
		page: p,
		perPage: pp,
		total,
		totalPages: Math.ceil(total / pp),
	};
}

module.exports = {
	createUser,
	findById,
	findByEmail,
	findByUsername,
	updateUser,
	deleteUser,
	listUsers,
};
