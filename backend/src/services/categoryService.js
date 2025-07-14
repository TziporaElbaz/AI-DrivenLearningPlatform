// categoryService.js
import { Category } from '../models/index.js';

export async function getAllCategories() {
  return Category.findAll();
}

export async function createCategory({ name }) {
  return Category.create({ name });
}

export async function updateCategory(id, data) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Category not found');
  return category.update(data);
}

export async function deleteCategory(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Category not found');
  return category.destroy();
}