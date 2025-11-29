import express from 'express';
import * as ctrl from '../controllers/taxLookupController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/tax-rates', requireAuth, ctrl.listTaxRates);
router.get('/hsn', requireAuth, ctrl.listHsn);
router.get('/state-gst', requireAuth, ctrl.listStateGst);

export default router;
