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

class ConstructionWorks extends Model<InferAttributes<ConstructionWorks>, InferCreationAttributes<ConstructionWorks>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare img: string;
  declare price_per_hour: number;
  declare value: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ConstructionWorks.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    price_per_hour: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'construction-works',
  },
);

export default ConstructionWorks;
