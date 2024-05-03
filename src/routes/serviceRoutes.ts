import express from 'express';
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController';

const router = express.Router();

router.post('/:categoryId.service', createService);
router.get('/:cateogryId/services', getServices);
router.put('/:categoryId/service/:serviceId', updateService);
router.delete('/:categoryId/service/:serviceId', deleteService);

export default router;
