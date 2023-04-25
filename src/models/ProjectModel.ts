import sequelize from '../db.js';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class ProjectModel extends Model<InferAttributes<ProjectModel>, InferCreationAttributes<ProjectModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare image: string;
  declare date: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ProjectModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'projects',
  },
);

export default ProjectModel;
