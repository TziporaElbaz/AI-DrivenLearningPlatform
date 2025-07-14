import express from 'express';
import {
  handleGetSubCategories,
  handleCreateSubCategory,
  handleUpdateSubCategory,
  handleDeleteSubCategory
} from '../controllers/subCategoryController.js';
import auth from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

router.get('/:categoryId', handleGetSubCategories);
router.post('/', auth, isAdmin, validateRequest(['name', 'category_id']), handleCreateSubCategory);
router.put('/:id', auth, isAdmin, handleUpdateSubCategory);
router.delete('/:id', auth, isAdmin, handleDeleteSubCategory);

export default router;