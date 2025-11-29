import express from 'express';
import * as ctrl from '../controllers/productsController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, ctrl.listProducts);
router.post('/', requireAuth, ctrl.createProduct);
router.get('/:id', requireAuth, ctrl.getProduct);
router.put('/:id', requireAuth, ctrl.updateProduct);
router.delete('/:id', requireAuth, ctrl.deleteProduct);

export default router;
