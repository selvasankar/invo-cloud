
// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("invoice_payments", (table) => {
    table.increments("id").primary();

    table
      .integer("invoice_id")
      .unsigned()
      .references("id")
      .inTable("invoices")
      .onDelete("CASCADE");

    table.decimal("amount", 10, 2).notNullable();

    table.string("method").notNullable(); // cash/card/upi/bank
    table.string("reference").nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("invoice_payments");
}
