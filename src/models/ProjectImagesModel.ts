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

class ProjectImagesModel extends Model<
  InferAttributes<ProjectImagesModel>,
  InferCreationAttributes<ProjectImagesModel>
> {
  declare id: CreationOptional<number>;
  declare image: string;
  declare projectId: ForeignKey<ProjectModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    images: Association<ProjectImagesModel, ProjectModel>;
  };
}

ProjectImagesModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'projects-images',
  },
);

ProjectModel.hasMany(ProjectImagesModel, {
  sourceKey: 'id',
  foreignKey: 'projectId',
  as: 'images',
});
ProjectImagesModel.belongsTo(ProjectModel, {
  foreignKey: 'projectId',
  as: 'projects',
});
export default ProjectImagesModel;
