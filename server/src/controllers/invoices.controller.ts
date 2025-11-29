// server/src/controllers/invoices.controller.ts
import { Request, Response } from "express";
import invoiceService from "../services/invoice.service"; // adjust path if needed

export default {
  // GET /invoices
  async listInvoices(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const perPage = Number(req.query.perPage || 20);
      const data = await invoiceService.list({ page, perPage });
      return res.json({ status: true, data });
    } catch (err: any) {
      console.error("listInvoices error:", err);
      return res.status(500).json({ status: false, message: err.message || "Server error" });
    }
  },

  // GET /invoices/:id
  async getInvoiceById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await invoiceService.get(id);
      return res.json({ status: true, data });
    } catch (err: any) {
      console.error("getInvoiceById error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // POST /invoices
  async createInvoice(req: Request, res: Response) {
    try {
      const payload = req.body;
      const created = await invoiceService.create(payload);
      return res.status(201).json({ status: true, data: created });
    } catch (err: any) {
      console.error("createInvoice error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // PATCH /invoices/:id/status  (update invoice status)
  async updateStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      if (typeof status !== "string") {
        return res.status(400).json({ status: false, message: "Missing or invalid status" });
      }
      const updated = await invoiceService.updateStatus(id, status);
      return res.json({ status: true, data: updated });
    } catch (err: any) {
      console.error("updateStatus error:", err);
      const statusCode = err.status || 500;
      return res.status(statusCode).json({ status: false, message: err.message || "Server error" });
    }
  },

  // DELETE /invoices/:id
  async deleteInvoice(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await invoiceService.delete(id);
      return res.json({ status: true, message: "Invoice deleted" });
    } catch (err: any) {
      console.error("deleteInvoice error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // POST /invoices/:id/payments
  async addPayment(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { amount, method, reference } = req.body;
      if (typeof amount !== "number") {
        return res.status(400).json({ status: false, message: "Invalid amount" });
      }
      const payment = await invoiceService.addPayment(id, { amount, method, reference });
      return res.status(201).json({ status: true, data: payment });
    } catch (err: any) {
      console.error("addPayment error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },
};
