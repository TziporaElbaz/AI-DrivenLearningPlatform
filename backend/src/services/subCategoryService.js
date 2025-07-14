// subCategoryService.js
import { SubCategory } from '../models/index.js';

export async function getSubCategoriesByCategory(categoryId) {
  return SubCategory.findAll({ where: { category_id: categoryId } });
}

export async function createSubCategory({ name, category_id }) {
  return SubCategory.create({ name, category_id });
}

export async function updateSubCategory(id, data) {
  const subCategory = await SubCategory.findByPk(id);
  if (!subCategory) throw new Error('SubCategory not found');
  return subCategory.update(data);
}

export async function deleteSubCategory(id) {
  const subCategory = await SubCategory.findByPk(id);
  if (!subCategory) throw new Error('SubCategory not found');
  return subCategory.destroy();
}