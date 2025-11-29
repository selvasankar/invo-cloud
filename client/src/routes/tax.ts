import express from 'express';
import { calculateInvoiceTax } from '../services/taxEngine';
import { requireAuth } from '../middleware/auth';
const router = express.Router();

router.post('/calc', requireAuth, async (req, res) => {
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
