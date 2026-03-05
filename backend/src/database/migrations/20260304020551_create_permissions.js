/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("permissions", (t) => {
		t.increments("id").primary();

		t.string("module", 50).notNullable(); // request, workflow, users
		t.string("permission", 100).notNullable(); // create, edit, view, delete

		t.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("permissions");
};