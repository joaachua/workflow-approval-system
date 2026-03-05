/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users_roles", (t) => {
		t.increments("id").primary();

		t.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");

		t.integer("role_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("roles")
			.onDelete("CASCADE");

		t.timestamp("assigned_at", { useTz: true }).defaultTo(knex.fn.now());

		t.integer("assigned_by")
			.unsigned()
			.nullable()
			.references("id")
			.inTable("users")
			.onDelete("SET NULL");

		t.unique(["user_id", "role_id"]);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users_roles");
};
