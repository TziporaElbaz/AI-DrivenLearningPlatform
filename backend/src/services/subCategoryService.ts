import SubCategory from '../models/SubCategory';

export async function getSubCategoriesByCategory(categoryId: number) {
  return SubCategory.findAll({ where: { category_id: categoryId } });
}

export async function createSubCategory({ name, category_id }: { name: string; category_id: number }) {
  return SubCategory.create({ name, category_id });
}

export async function updateSubCategory(id: number, data: Partial<{ name: string; category_id: number }>) {
  const subCategory = await SubCategory.findByPk(id);
  if (!subCategory) throw new Error('SubCategory not found');
  return subCategory.update(data);
}

export async function deleteSubCategory(id: number) {
  const subCategory = await SubCategory.findByPk(id);
  if (!subCategory) throw new Error('SubCategory not found');
  return subCategory.destroy();
}
