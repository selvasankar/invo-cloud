/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  // keep password_resets empty
  await knex("password_resets").del();
}
