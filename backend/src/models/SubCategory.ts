import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Category from './Category';

interface SubCategoryAttributes {
  id: number;
  name: string;
  category_id: number;
}

interface SubCategoryCreationAttributes extends Optional<SubCategoryAttributes, 'id'> {}

class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
  public id!: number;
  public name!: string;
  public category_id!: number;
}

SubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Category, key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'SubCategory',
    tableName: 'SubCategories',
    timestamps: false,
  }
);

export default SubCategory;
