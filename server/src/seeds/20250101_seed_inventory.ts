/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex("inventory").del();

  // find product ids
  const products = await knex("products").select("id", "name");

  const rows = products.map((p) => {
    return {
      product_id: p.id,
      quantity: p.name.toLowerCase().includes("mug") ? 120 : 300,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    };
  });

  if (rows.length) {
    await knex("inventory").insert(rows);
  }
}
