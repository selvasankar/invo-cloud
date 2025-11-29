import express from 'express';
import * as ctrl from '../controllers/customersController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, ctrl.listCustomers);
router.post('/', requireAuth, ctrl.createCustomer);
router.get('/:id', requireAuth, ctrl.getCustomer);
router.put('/:id', requireAuth, ctrl.updateCustomer);
router.delete('/:id', requireAuth, ctrl.deleteCustomer);

export default router;
