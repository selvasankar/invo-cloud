// server/src/controllers/inventory.controller.ts
import { Request, Response } from "express";
import inventoryService from "../services/inventory.service";

export default {
  // GET /inventory
  async list(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const perPage = Number(req.query.perPage || 50);
      const data = await inventoryService.list({ page, perPage });
      return res.json({ status: true, data });
    } catch (err: any) {
      console.error("inventory.list error:", err);
      return res.status(500).json({ status: false, message: err.message || "Server error" });
    }
  },

  // POST /inventory
  async add(req: Request, res: Response) {
    try {
      const payload = req.body; // { product_id, quantity }
      const created = await inventoryService.addStock(payload);
      return res.status(201).json({ status: true, data: created });
    } catch (err: any) {
      console.error("inventory.add error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // PATCH /inventory/:id
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { quantity } = req.body;

      const updated = await inventoryService.updateStock(id, quantity);
      return res.json({ status: true, data: updated });
    } catch (err: any) {
      console.error("inventory.update error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },

  // GET /inventory/:id
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await inventoryService.getById(id);
      return res.json({ status: true, data });
    } catch (err: any) {
      console.error("inventory.getById error:", err);
      const status = err.status || 500;
      return res.status(status).json({ status: false, message: err.message || "Server error" });
    }
  },
};
