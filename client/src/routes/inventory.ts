import express from 'express';
import * as ctrl from '../controllers/inventoryController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, ctrl.listInventory);
router.post('/', requireAuth, ctrl.createInventory);
router.get('/:id', requireAuth, ctrl.getInventory);
router.put('/:id', requireAuth, ctrl.updateInventory);
router.delete('/:id', requireAuth, ctrl.deleteInventory);

export default router;
