"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = __importDefault(require("./User"));
const Category_1 = __importDefault(require("./Category"));
const SubCategory_1 = __importDefault(require("./SubCategory"));
class Prompt extends sequelize_1.Model {
}
Prompt.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: User_1.default, key: 'id' },
        onDelete: 'CASCADE',
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Category_1.default, key: 'id' },
        onDelete: 'CASCADE',
    },
    sub_category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: SubCategory_1.default, key: 'id' },
        onDelete: 'CASCADE',
    },
    prompt: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    response: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Prompt',
    tableName: 'Prompts',
    timestamps: false,
});
exports.default = Prompt;
