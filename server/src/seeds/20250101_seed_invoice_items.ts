/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  // If invoices were created above, skip
  const invCount = await knex("invoices").count("id as cnt").first();
  if (Number(invCount.cnt) === 0) return;

  // This seed is intentionally empty because invoice items are created with invoices in the other seed.
}
