import express, { Router } from 'express';
import {
  handleGetAllCategories,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory
} from '../controllers/categoryController';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import validateRequest from '../middlewares/validateRequest';

const router: Router = express.Router();

router.get('/', handleGetAllCategories);
router.post('/', auth, isAdmin, validateRequest(['name']), handleCreateCategory);
router.put('/:id', auth, isAdmin, validateRequest(['name']), handleUpdateCategory);
router.delete('/:id', auth, isAdmin, handleDeleteCategory);

export default router;
