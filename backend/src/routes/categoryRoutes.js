// src/routes/categoryRoutes.js
import express from 'express';
import {
  handleGetAllCategories,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory
} from '../controllers/categoryController.js';

import auth from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

// שליפת כל הקטגוריות (פתוח לכולם)
router.get('/', handleGetAllCategories);


// יצירת קטגוריה (רק לאדמין + ולידציה)
router.post('/', auth, isAdmin, validateRequest(['name']), handleCreateCategory);

// עדכון קטגוריה (רק לאדמין)
router.put('/:id', auth, isAdmin, handleUpdateCategory);

// מחיקת קטגוריה (רק לאדמין)
router.delete('/:id', auth, isAdmin, handleDeleteCategory);

export default router;
