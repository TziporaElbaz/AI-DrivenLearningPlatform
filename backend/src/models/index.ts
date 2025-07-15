import Category from './Category';
import SubCategory from './SubCategory';
import User from './User';
import Prompt from './Prompt';
import { sequelize } from '../config/database';

// קשרים בין הטבלאות:
Category.hasMany(SubCategory, { foreignKey: 'category_id', as: 'subCategories' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

User.hasMany(Prompt, { foreignKey: 'user_id', as: 'prompts' });
Prompt.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Category.hasMany(Prompt, { foreignKey: 'category_id', as: 'prompts' });
Prompt.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

SubCategory.hasMany(Prompt, { foreignKey: 'sub_category_id', as: 'prompts' });
Prompt.belongsTo(SubCategory, { foreignKey: 'sub_category_id', as: 'subCategory' });

export { Category, SubCategory, User, Prompt, sequelize };
