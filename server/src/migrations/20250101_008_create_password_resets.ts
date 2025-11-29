// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {
/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("password_resets", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().index();
    table.string("token_hash").notNullable();
    table.timestamp("expires_at").notNullable().index();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("password_resets");
}
