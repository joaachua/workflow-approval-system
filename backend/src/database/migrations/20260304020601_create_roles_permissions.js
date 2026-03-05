/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("roles_permissions", (t) => {
		t.increments("id").primary();

		t.integer("role_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("roles")
			.onDelete("CASCADE");

		t.integer("permission_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("permissions")
			.onDelete("CASCADE");

		t.unique(["role_id", "permission_id"]);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("roles_permissions");
};
