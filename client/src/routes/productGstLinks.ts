import express from 'express';
import * as ctrl from '../controllers/productGstController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, ctrl.listLinks);
router.post('/', requireAuth, ctrl.createLink);
router.get('/:id', requireAuth, ctrl.getLink);
router.put('/:id', requireAuth, ctrl.updateLink);
router.delete('/:id', requireAuth, ctrl.deleteLink);

export default router;
