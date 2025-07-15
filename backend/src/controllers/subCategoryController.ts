import { Request, Response } from 'express';
import { getSubCategoriesByCategory, createSubCategory, updateSubCategory, deleteSubCategory } from '../services/subCategoryService';

export async function handleGetSubCategories(req: Request, res: Response) {
  try {
    const subCategories = await getSubCategoriesByCategory(Number(req.params.categoryId));
    res.json(subCategories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleCreateSubCategory(req: Request, res: Response) {
  try {
    const { name, category_id } = req.body;
    const subCategory = await createSubCategory({ name, category_id: Number(category_id) });
    res.status(201).json(subCategory);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleUpdateSubCategory(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
  return res.status(400).json({ error: 'Invalid subcategory ID' });
}
    const { name, category_id } = req.body;
    const subCategory = await updateSubCategory(id, { name, category_id: Number(category_id) });
    res.json(subCategory);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleDeleteSubCategory(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await deleteSubCategory(id);
    res.json({ message: 'SubCategory deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
