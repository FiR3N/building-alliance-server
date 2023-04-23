import sequelize from '../db.js';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
class Employees extends Model<InferAttributes<Employees>, InferCreationAttributes<Employees>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare surname: string;
  declare patronymic: string;
  declare post: string;
  declare description: string;
  declare img: string;
  declare telephone: string;
  declare email: string;
  declare isShowable: boolean;
  declare entry_to_work: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Employees.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    post: { type: DataTypes.STRING, allowNull: false },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [30, 300],
      },
    },
    img: { type: DataTypes.STRING, allowNull: true },
    telephone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    isShowable: { type: DataTypes.BOOLEAN, allowNull: false },
    entry_to_work: { type: DataTypes.DATEONLY, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'employees',
  },
);

export default Employees;
