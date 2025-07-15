import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';
import Category from './Category';
import SubCategory from './SubCategory';

interface PromptAttributes {
  id: number;
  user_id: string;
  category_id: number;
  sub_category_id: number;
  prompt: string;
  response: string;
  created_at?: Date;
}

interface PromptCreationAttributes extends Optional<PromptAttributes, 'id' | 'created_at'> {}

class Prompt extends Model<PromptAttributes, PromptCreationAttributes> implements PromptAttributes {
  public id!: number;
  public user_id!: string;
  public category_id!: number;
  public sub_category_id!: number;
  public prompt!: string;
  public response!: string;
  public created_at?: Date;
}

Prompt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: User, key: 'id' },
      onDelete: 'CASCADE',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Category, key: 'id' },
      onDelete: 'CASCADE',
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: SubCategory, key: 'id' },
      onDelete: 'CASCADE',
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Prompt',
    tableName: 'Prompts',
    timestamps: false,
  }
);

export default Prompt;
