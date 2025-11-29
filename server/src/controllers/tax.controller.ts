// server/src/controllers/tax.controller.ts
import { Request, Response } from "express";
import taxService from "../services/tax.service"; 

export default {
  // GET /api/v1/tax
  async listTaxes(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const perPage = Number(req.query.perPage || 50);
      const data = await taxService.list({ page, perPage });
      return res.json({ status: true, data });
    } catch (err: any) {
      console.error("tax.listTaxes error:", err);
      return res.status(500).json({ status: false, message: err.message || "Server error" });
    }
  },

  // GET /api/v1/tax/:id
  async getTaxById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const tax = await taxService.get(id);
      return res.json({ status: true, data: tax });
    } catch (err: any) {
      console.error("tax.getTaxById error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // POST /api/v1/tax
  async createTax(req: Request, res: Response) {
    try {
      const payload = req.body; // { name: string, rate: number }
      const created = await taxService.create(payload);
      return res.status(201).json({ status: true, data: created });
    } catch (err: any) {
      console.error("tax.createTax error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // PUT /api/v1/tax/:id
  async updateTax(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const payload = req.body; // { name?: string, rate?: number }
      const updated = await taxService.update(id, payload);
      return res.json({ status: true, data: updated });
    } catch (err: any) {
      console.error("tax.updateTax error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // DELETE /api/v1/tax/:id
  async deleteTax(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await taxService.delete(id);
      return res.json({ status: true, message: "Tax deleted" });
    } catch (err: any) {
      console.error("tax.deleteTax error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },
};
