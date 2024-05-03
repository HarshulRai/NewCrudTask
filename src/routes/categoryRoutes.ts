import express from 'express';
import { createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController';

const router = express.Router();

router.post('/', createCategory);
router.get('/categories', getCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;
