import { Request, Response } from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

export async function handleGetAllCategories(req: Request, res: Response) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleCreateCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const category = await createCategory({ name });
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleUpdateCategory(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const category = await updateCategory(id, req.body);
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleDeleteCategory(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await deleteCategory(id);
    res.json({ message: 'Category deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
