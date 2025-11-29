// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("inventory", (table) => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.integer("quantity").notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("inventory");
}
