// src/controllers/subCategoryController.js
import { getSubCategoriesByCategory, createSubCategory, updateSubCategory, deleteSubCategory } from '../services/subCategoryService.js';

export async function handleGetSubCategories(req, res) {
  try {
    const subCategories = await getSubCategoriesByCategory(req.params.categoryId);
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleCreateSubCategory(req, res) {
  try {
    const { name, category_id } = req.body;
    const subCategory = await createSubCategory({ name, category_id });
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleUpdateSubCategory(req, res) {
  try {
    const subCategory = await updateSubCategory(req.params.id, req.body);
    res.json(subCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleDeleteSubCategory(req, res) {
  try {
    await deleteSubCategory(req.params.id);
    res.json({ message: 'SubCategory deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}