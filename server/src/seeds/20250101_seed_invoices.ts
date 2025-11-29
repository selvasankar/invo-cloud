/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex("invoices").del();
  await knex("invoice_items").del();
  await knex("invoice_payments").del();

  // find a customer
  const customer = await knex("customers").where({ email: "billing@acme.test" }).first();
  const product = await knex("products").where({ name: "Blue Mug" }).first();

  if (!customer || !product) {
    // nothing to do if dependencies missing
    return;
  }

  // create a sample invoice
  const [invoice] = await knex("invoices")
    .insert({
      customer_id: customer.id,
      invoice_date: knex.fn.now(),
      status: "paid",
      notes: "Test invoice",
      deleted: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    })
    .returning("*");

  // if .returning not supported in your DB/Knex setup, fetch last inserted row:
  // const invoiceId = invoice?.id || (await knex("invoices").max("id as id")).[0].id;

  // Create an item
  await knex("invoice_items").insert({
    invoice_id: invoice.id,
    product_id: product.id,
    quantity: 2,
    price: product.price,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });

  // Create a payment
  await knex("invoice_payments").insert({
    invoice_id: invoice.id,
    amount: Number(product.price) * 2,
    method: "card",
    reference: "TXN123",
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  });
}
