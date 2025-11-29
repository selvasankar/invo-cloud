/**
 * src/controllers/invoice.controller.ts
 *
 * Express controller that delegates to InvoiceService.
 * Copy into your controllers folder and wire the routes to the router below.
 */

import { Request, Response, NextFunction } from 'express';
import InvoiceService, { InvoiceCreateDTO } from '../services/invoice.service';

class InvoiceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: InvoiceCreateDTO = req.body;
      // Basic validation (improve with Joi/zod if required)
      if (!payload.invoice_number || !payload.customer_id || !Array.isArray(payload.items) || payload.items.length === 0) {
        return res.status(400).json({ message: 'invoice_number, customer_id and items are required' });
      }

      const created = await InvoiceService.createInvoice(payload);
      return res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const invoice = await InvoiceService.getInvoiceById(id);
      if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
      return res.json(invoice);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const result = await InvoiceService.listInvoices(page, limit);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const patch = req.body;
      const updated = await InvoiceService.updateInvoice(id, patch);
      if (!updated) return res.status(404).json({ message: 'Invoice not found' });
      return res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await InvoiceService.deleteInvoice(id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new InvoiceController();
