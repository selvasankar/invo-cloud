/**
 * src/routes/invoices.ts
 *
 * Express router for invoices.
 * Usage:
 *   import invoicesRouter from './routes/invoices';
 *   app.use('/api/v1/invoices', invoicesRouter);
 *
 * Replace `authMiddleware` with your actual auth middleware (JWT).
 */

import { Router } from 'express';
import InvoiceController from '../controllers/invoice.controller';

// TODO: replace with your actual auth middleware (JWT, sessions, etc.)
const authMiddleware = (req, res, next) => {
  // If you have a real middleware, import and use it instead.
  return next();
};

const router = Router();

// Public (health-check elsewhere)
router.get('/', authMiddleware, (req, res, next) => InvoiceController.list(req, res, next));
router.post('/', authMiddleware, (req, res, next) => InvoiceController.create(req, res, next));
router.get('/:id', authMiddleware, (req, res, next) => InvoiceController.getById(req, res, next));
router.put('/:id', authMiddleware, (req, res, next) => InvoiceController.update(req, res, next));
router.delete('/:id', authMiddleware, (req, res, next) => InvoiceController.remove(req, res, next));

export default router;
