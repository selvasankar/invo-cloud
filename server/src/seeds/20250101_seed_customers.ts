/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex("customers").del();

  await knex("customers").insert([
    {
      name: "ACME Ltd",
      email: "billing@acme.test",
      phone: "9876543210",
      address: "123 High St, Springfield",
      deleted: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      name: "Beta Traders",
      email: "accounts@beta.test",
      phone: "9123456780",
      address: "45 Market Road, Metropolis",
      deleted: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
