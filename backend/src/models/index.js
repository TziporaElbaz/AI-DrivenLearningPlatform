import User from './User.js';
import Category from './Category.js';
import SubCategory from './SubCategory.js';
import Prompt from './Prompt.js';

// Associations
Category.hasMany(SubCategory, { foreignKey: 'category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Prompt, { foreignKey: 'user_id' });
Prompt.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Prompt, { foreignKey: 'category_id' });
Prompt.belongsTo(Category, { foreignKey: 'category_id' });

SubCategory.hasMany(Prompt, { foreignKey: 'sub_category_id' });
Prompt.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });

export { User, Category, SubCategory, Prompt };
