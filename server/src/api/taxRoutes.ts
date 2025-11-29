/**
 * taxRoutes.ts - example Express route wrapper that uses taxEngine.calculateInvoiceTax
 * POST /api/v1/tax/calc
 * body: { items: [{sku, hsn, qty, price}], seller_state, buyer_state }
 */

import express from 'express';
import { calculateInvoiceTax } from '../services/taxEngine';

const router = express.Router();

router.post('/calc', async (req, res) => {
  try {
    const { items, seller_state, buyer_state } = req.body;
    const result = await calculateInvoiceTax({ items, seller_state, buyer_state });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tax calculation failed' });
  }
});

export default router;
