/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", (t) => {
		t.increments("id").primary();

		t.string("email", 255).notNullable().unique();
		t.string("username", 80).unique();
		t.string("full_name", 255).nullable();

		t.string("password_hash", 255).notNullable();

		t.boolean("is_active").notNullable().defaultTo(true);
		t.timestamp("last_login_at", { useTz: true }).nullable();

		t.timestamp("deleted_at", { useTz: true }).nullable(); // soft delete

		t.timestamps(true, true); // created_at, updated_at
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};