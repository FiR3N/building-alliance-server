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

class VacancyModel extends Model<InferAttributes<VacancyModel>, InferCreationAttributes<VacancyModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare wage: number;
  declare experience: string;
  declare occupation: string;
  declare description: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

VacancyModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    wage: { type: DataTypes.DOUBLE, allowNull: true },
    experience: { type: DataTypes.STRING, allowNull: false },
    occupation: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'vacancies',
  },
);

export default VacancyModel;
