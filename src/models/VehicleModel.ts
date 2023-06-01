import sequelize from '../db.js';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class VehicleModel extends Model<InferAttributes<VehicleModel>, InferCreationAttributes<VehicleModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare priceWithVAT: number;
  declare priceWithoutVAT: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

VehicleModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    priceWithVAT: { type: DataTypes.DECIMAL, allowNull: false },
    priceWithoutVAT: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'vehicles',
  },
);

export default VehicleModel;
