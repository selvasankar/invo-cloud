import db from "../db/knex";

export default {
  async list({ page, perPage }) {
    return db("invoices")
      .select("*")
      .where({ deleted: false })
      .orderBy("id", "desc")
      .limit(perPage)
      .offset((page - 1) * perPage);
  },

  async getById(id: number) {
    return db("invoices").where({ id, deleted: false }).first();
  },

  async getInvoiceItems(invoiceId: number) {
    return db("invoice_items").where({ invoice_id: invoiceId });
  },

  async getPayments(invoiceId: number) {
    return db("invoice_payments").where({ invoice_id: invoiceId });
  },

  async createInvoice(trx: any, payload: any) {
    const [invoice] = await trx("invoices").insert(payload).returning("*");
    return invoice;
  },

  async addInvoiceItem(trx: any, item: any) {
    return trx("invoice_items").insert(item);
  },

  async updateInvoiceStatus(id: number, status: string) {
    return db("invoices").where({ id }).update({ status });
  },

  async addPayment(trx: any, payment: any) {
    return trx("invoice_payments").insert(payment);
  },

  async softDelete(id: number) {
    return db("invoices").where({ id }).update({ deleted: true });
  },
};
