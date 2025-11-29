// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("invoice_items", (table) => {
    table.increments("id").primary();

    table
      .integer("invoice_id")
      .unsigned()
      .references("id")
      .inTable("invoices")
      .onDelete("CASCADE");

    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table.integer("quantity").notNullable();
    table.decimal("price", 10, 2).notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("invoice_items");
}
