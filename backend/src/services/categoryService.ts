import Category from '../models/Category';

export async function getAllCategories() {
  return Category.findAll();
}

export async function createCategory({ name }: { name: string }) {
  return Category.create({ name });
}

export async function updateCategory(id: string, data: Partial<{ name: string }>) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Category not found');
  return category.update(data);
}

export async function deleteCategory(id: string) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Category not found');
  return category.destroy();
}
