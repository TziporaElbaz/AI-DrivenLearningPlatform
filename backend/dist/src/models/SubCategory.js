"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Category_1 = __importDefault(require("./Category"));
class SubCategory extends sequelize_1.Model {
}
SubCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Category_1.default, key: 'id' },
        onDelete: 'CASCADE',
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'SubCategory',
    tableName: 'SubCategories',
    timestamps: false,
});
exports.default = SubCategory;
