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
import ProjectModel from './ProjectModel.js';

class ProjectInfosModel extends Model<InferAttributes<ProjectInfosModel>, InferCreationAttributes<ProjectInfosModel>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare projectId: ForeignKey<ProjectModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    infos: Association<ProjectInfosModel, ProjectModel>;
  };
}

ProjectInfosModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'projects-infos',
  },
);

ProjectModel.hasMany(ProjectInfosModel, {
  sourceKey: 'id',
  foreignKey: 'projectId',
  as: 'infos',
});
ProjectInfosModel.belongsTo(ProjectModel, {
  foreignKey: 'projectId',
  as: 'projects',
});

export default ProjectInfosModel;
