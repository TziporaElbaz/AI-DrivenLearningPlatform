import { Request, Response, NextFunction } from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { AppError } from '../middlewares/errorHandler';

export const handleGetAllCategories = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await getAllCategories();
  
  res.json({
    success: true,
    data: categories
  });
});

export const handleCreateCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Category name is required and must be a non-empty string', 400);
  }
  
  const category = await createCategory({ name: name.trim() });
  
  res.status(201).json({
    success: true,
    data: category
  });
});

export const handleUpdateCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  if (!id) {
    throw new AppError('Category ID is required', 400);
  }
  
  const { name } = req.body;
  if (name && (typeof name !== 'string' || name.trim() === '')) {
    throw new AppError('Category name must be a non-empty string', 400);
  }
  
  const category = await updateCategory(id, req.body);
  
  res.json({
    success: true,
    data: category
  });
});

export const handleDeleteCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  if (!id) {
    throw new AppError('Category ID is required', 400);
  }
  
  await deleteCategory(id);
  
  res.json({
    success: true,
    message: 'Category deleted successfully'
  });
});
