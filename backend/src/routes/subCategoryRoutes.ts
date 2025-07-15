import express, { Router } from 'express';
import {
  handleGetSubCategories,
  handleCreateSubCategory,
  handleUpdateSubCategory,
  handleDeleteSubCategory
} from '../controllers/subCategoryController';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import validateRequest from '../middlewares/validateRequest';

const router: Router = express.Router();

router.get('/:categoryId', handleGetSubCategories);
router.post('/', auth, isAdmin, validateRequest(['name', 'category_id']), handleCreateSubCategory);
router.put('/:id', auth, isAdmin, validateRequest(['name', 'category_id']), handleUpdateSubCategory);
router.delete('/:id', auth, isAdmin, handleDeleteSubCategory);

export default router;
