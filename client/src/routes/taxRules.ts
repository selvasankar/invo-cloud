import express from 'express';
import * as ctrl from '../controllers/taxRulesController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, ctrl.listRules);
router.post('/', requireAuth, ctrl.createRule);
router.get('/:id', requireAuth, ctrl.getRule);
router.put('/:id', requireAuth, ctrl.updateRule);
router.delete('/:id', requireAuth, ctrl.deleteRule);

export default router;
