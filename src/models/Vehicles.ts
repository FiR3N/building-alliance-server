import sequelize from '../db.js';
import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class Vehicles extends Model<InferAttributes<Vehicles>, InferCreationAttributes<Vehicles>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare img: string;
  declare count: number;
  declare year_production: Date;
  declare price_per_hour: number;
  //   declare userId: ForeignKey<UserModel["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Vehicles.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    price_per_hour: { type: DataTypes.DECIMAL, allowNull: false },
    count: { type: DataTypes.INTEGER, allowNull: false },
    year_production: { type: DataTypes.DATEONLY, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'vehicles',
  },
);

export default Vehicles;
