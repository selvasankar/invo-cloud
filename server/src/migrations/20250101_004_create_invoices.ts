// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("invoices", (table) => {
    table.increments("id").primary();

    table
      .integer("customer_id")
      .unsigned()
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE");

    table.date("invoice_date").notNullable();

    table.string("status").notNullable().defaultTo("draft");

    table.text("notes").nullable();

    table.boolean("deleted").defaultTo(false);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("invoices");
}
