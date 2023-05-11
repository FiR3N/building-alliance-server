import sequelize from '../db.js';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

RoleModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'roles',
  },
);

export default RoleModel;
