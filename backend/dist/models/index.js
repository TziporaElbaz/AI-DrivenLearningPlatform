"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Prompt = exports.User = exports.SubCategory = exports.Category = void 0;
const Category_1 = __importDefault(require("./Category"));
exports.Category = Category_1.default;
const SubCategory_1 = __importDefault(require("./SubCategory"));
exports.SubCategory = SubCategory_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Prompt_1 = __importDefault(require("./Prompt"));
exports.Prompt = Prompt_1.default;
const database_1 = require("../config/database");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
// קשרים בין הטבלאות:
Category_1.default.hasMany(SubCategory_1.default, { foreignKey: 'category_id', as: 'subCategories' });
SubCategory_1.default.belongsTo(Category_1.default, { foreignKey: 'category_id', as: 'category' });
User_1.default.hasMany(Prompt_1.default, { foreignKey: 'user_id', as: 'prompts' });
Prompt_1.default.belongsTo(User_1.default, { foreignKey: 'user_id', as: 'user' });
Category_1.default.hasMany(Prompt_1.default, { foreignKey: 'category_id', as: 'prompts' });
Prompt_1.default.belongsTo(Category_1.default, { foreignKey: 'category_id', as: 'category' });
SubCategory_1.default.hasMany(Prompt_1.default, { foreignKey: 'sub_category_id', as: 'prompts' });
Prompt_1.default.belongsTo(SubCategory_1.default, { foreignKey: 'sub_category_id', as: 'subCategory' });
