// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {
/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("customers", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").nullable();
    table.string("phone").nullable();
    table.text("address").nullable();
    table.boolean("deleted").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("customers");
}
