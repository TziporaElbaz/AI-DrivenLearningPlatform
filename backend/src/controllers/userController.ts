import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getUserById, getAllUsers } from '../services/userService';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../types/auth';

export const handleRegister = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name, phone } = req.query;
  
  if (!id || !name || !phone || typeof id !== 'string' || typeof name !== 'string' || typeof phone !== 'string') {
    throw new AppError('id, name, and phone are required in query string', 400);
  }
  
  const user = await registerUser({ id, name, phone });
  res.status(201).json({
    success: true,
    data: user
  });
});

export const handleLogin = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id;
  
  if (!id || typeof id !== 'string') {
    throw new AppError('User ID is required in query string', 400);
  }
  
  const { user, token } = await loginUser({ id });

  res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
  res.json({
    success: true,
    data: { user, token }
  });
});

export const handleLogout = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export const handleGetUser = asyncWrapper(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError('Unauthorized - Authentication required', 401);
  }
  
  const user = await getUserById(req.user.id);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.json({
    success: true,
    data: user
  });
});

export const handleGetAllUsers = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const users = await getAllUsers();
  res.json({
    success: true,
    data: users
  });
});
