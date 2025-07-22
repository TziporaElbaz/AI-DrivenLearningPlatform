import { Response, NextFunction } from 'express';
import { createPrompt, getUserPrompts, getUserPromptsByUserId } from '../services/promptService';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../types/auth';

export const handleCreatePrompt = asyncWrapper(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError('Unauthorized - Authentication required', 401);
  }
  
  const { categoryId, subCategoryId, promptText } = req.body;
  
  if (!categoryId || !subCategoryId || !promptText) {
    throw new AppError('categoryId, subCategoryId, and promptText are required', 400);
  }
  
  const userId = req.user.id;
  const prompt = await createPrompt({ userId, categoryId, subCategoryId, promptText });
  
  res.status(201).json({
    success: true,
    data: prompt
  });
});

export const handleGetUserPrompts = asyncWrapper(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError('Unauthorized - Authentication required', 401);
  }
  
  const userId = req.user.id;
  const prompts = await getUserPrompts(userId);
  
  res.json({
    success: true,
    data: prompts
  });
});

export const handleGetUserPromptsByUserId = asyncWrapper(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError('Unauthorized - Authentication required', 401);
  }
  
  const { userId } = req.params;
  
  if (!userId) {
    throw new AppError('User ID parameter is required', 400);
  }
  
  const prompts = await getUserPromptsByUserId(userId);
  
  res.json({
    success: true,
    data: prompts
  });
});
