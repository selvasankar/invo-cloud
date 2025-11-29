import db from "../db/knex";
import invoiceRepo from "../repositories/invoice.repository";
import inventoryRepo from "../repositories/inventory.repository";

export default {
  async list(page: number, perPage: number) {
    return invoiceRepo.list({ page, perPage });
  },

  async getById(id: number) {
    const invoice = await invoiceRepo.getById(id);
    if (!invoice) throw { status: 404, message: "Invoice not found" };

    const items = await invoiceRepo.getInvoiceItems(id);
    const payments = await invoiceRepo.getPayments(id);

    return { ...invoice, items, payments };
  },

  async create(payload: any) {
    return await db.transaction(async (trx) => {
      const { customer_id, invoice_date, items, notes } = payload;

      const invoice = await invoiceRepo.createInvoice(trx, {
        customer_id,
        invoice_date,
        notes,
      });

      for (const item of items) {
        const finalItem = {
          invoice_id: invoice.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        };

        await invoiceRepo.addInvoiceItem(trx, finalItem);

        // Update stock
        const stock = await inventoryRepo.getByProduct(item.product_id);
        if (!stock) {
          throw { status: 400, message: "Product has no stock entry" };
        }

        await inventoryRepo.updateStock(
          stock.id,
          stock.quantity - item.quantity
        );
      }

      return invoice;
    });
  },

  async updateStatus(id: number, status: string) {
    return invoiceRepo.updateInvoiceStatus(id, status);
  },

  async addPayment(id: number, payment: any) {
    return db.transaction(async (trx) => {
      const exists = await invoiceRepo.getById(id);
      if (!exists) throw { status: 404, message: "Invoice not found" };

      return invoiceRepo.addPayment(trx, {
        invoice_id: id,
        ...payment,
      });
    });
  },

  async deleteInvoice(id: number) {
    return invoiceRepo.softDelete(id);
  },
};
