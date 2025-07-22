import { Request, Response, NextFunction } from 'express';
import { getSubCategoriesByCategory, createSubCategory, updateSubCategory, deleteSubCategory } from '../services/subCategoryService';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { AppError } from '../middlewares/errorHandler';

export const handleGetSubCategories = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params;
  const categoryIdNum = Number(categoryId);
  
  if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
    throw new AppError('Invalid category ID - must be a positive number', 400);
  }
  
  const subCategories = await getSubCategoriesByCategory(categoryIdNum);
  
  res.json({
    success: true,
    data: subCategories
  });
});

export const handleCreateSubCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { name, category_id } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new AppError('SubCategory name is required and must be a non-empty string', 400);
  }
  
  const categoryIdNum = Number(category_id);
  if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
    throw new AppError('Valid category_id is required - must be a positive number', 400);
  }
  
  const subCategory = await createSubCategory({ 
    name: name.trim(), 
    category_id: categoryIdNum 
  });
  
  res.status(201).json({
    success: true,
    data: subCategory
  });
});

export const handleUpdateSubCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNum = Number(id);
  
  if (isNaN(idNum) || idNum <= 0) {
    throw new AppError('Invalid subcategory ID - must be a positive number', 400);
  }
  
  const { name, category_id } = req.body;
  
  if (name && (typeof name !== 'string' || name.trim() === '')) {
    throw new AppError('SubCategory name must be a non-empty string', 400);
  }
  
  let updateData: any = {};
  if (name) updateData.name = name.trim();
  
  if (category_id !== undefined) {
    const categoryIdNum = Number(category_id);
    if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
      throw new AppError('Valid category_id is required - must be a positive number', 400);
    }
    updateData.category_id = categoryIdNum;
  }
  
  const subCategory = await updateSubCategory(idNum, updateData);
  
  res.json({
    success: true,
    data: subCategory
  });
});

export const handleDeleteSubCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNum = Number(id);
  
  if (isNaN(idNum) || idNum <= 0) {
    throw new AppError('Invalid subcategory ID - must be a positive number', 400);
  }
  
  await deleteSubCategory(idNum);
  
  res.json({
    success: true,
    message: 'SubCategory deleted successfully'
  });
});
