/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex("products").del();

  await knex("products").insert([
    {
      name: "Blue Mug",
      price: 249.0,
      unit: "pcs",
      hsn_code: "1234",
      deleted: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      name: "Notebook A5",
      price: 79.5,
      unit: "pcs",
      hsn_code: "5678",
      deleted: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
