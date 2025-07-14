// src/controllers/categoryController.js
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService.js';

export async function handleGetAllCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleCreateCategory(req, res) {
  try {
    const { name } = req.body;
    const category = await createCategory({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleUpdateCategory(req, res) {
  try {
    const category = await updateCategory(req.params.id, req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleDeleteCategory(req, res) {
  try {
    await deleteCategory(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}