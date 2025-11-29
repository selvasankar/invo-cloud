// server/src/services/invoice.service.ts
import invoiceRepo from "../repositories/invoice.repository";

type ListOpts = { page?: number; perPage?: number };

export default {
  /**
   * List invoices with pagination options
   * Usage: invoiceService.list({ page, perPage })
   */
  async list(opts: ListOpts = {}) {
    const page = Number(opts.page ?? 1);
    const perPage = Number(opts.perPage ?? 20);
    // delegate to repo: repo.list should accept (page, perPage) or an options object
    if (typeof (invoiceRepo as any).list === "function") {
      // try calling repo.list with options object if supported
      try {
        return await (invoiceRepo as any).list({ page, perPage });
      } catch {
        // fallback to calling repo.list(page, perPage)
        return (invoiceRepo as any).list(page, perPage);
      }
    }
    throw new Error("Invoice repository 'list' method not implemented");
  },

  async get(id: number) {
    const inv = await invoiceRepo.getById(id);
    if (!inv) throw { status: 404, message: "Invoice not found" };
    // optionally, attach items/payments here if repo provides
    const items = (invoiceRepo as any).getInvoiceItems ? await (invoiceRepo as any).getInvoiceItems(id) : [];
    const payments = (invoiceRepo as any).getPayments ? await (invoiceRepo as any).getPayments(id) : [];
    return { ...inv, items, payments };
  },

  async create(payload: any) {
    // payload validation can go here
    // ensure invoiceRepo.create exists
    if (!(invoiceRepo as any).create) throw new Error("invoiceRepo.create missing");
    const created = await (invoiceRepo as any).create(payload);
    return created;
  },

  async updateStatus(id: number, status: string) {
    if (!(invoiceRepo as any).updateStatus) throw new Error("invoiceRepo.updateStatus missing");
    const updated = await (invoiceRepo as any).updateStatus(id, status);
    return updated;
  },

  async delete(id: number) {
    // prefer soft delete if available
    if ((invoiceRepo as any).softDelete) {
      await (invoiceRepo as any).softDelete(id);
      return true;
    }
    if ((invoiceRepo as any).delete) {
      await (invoiceRepo as any).delete(id);
      return true;
    }
    throw new Error("invoiceRepo.delete or invoiceRepo.softDelete missing");
  },

  async addPayment(invoiceId: number, payment: { amount: number; method?: string; reference?: string }) {
    if (!(invoiceRepo as any).addPayment) throw new Error("invoiceRepo.addPayment missing");
    const p = await (invoiceRepo as any).addPayment(invoiceId, payment);
    return p;
  },
};
