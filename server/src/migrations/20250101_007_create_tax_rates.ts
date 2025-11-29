// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("tax_rates", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("rate", 5, 2).notNullable(); // e.g. 18.00
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tax_rates");
}
