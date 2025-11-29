/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex("tax_rates").del();

  await knex("tax_rates").insert([
    {
      name: "GST 18%",
      rate: 18.0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      name: "GST 12%",
      rate: 12.0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
