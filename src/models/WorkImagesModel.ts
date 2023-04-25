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
import WorkModel from './WorkModel.js';

class WorkImagesModel extends Model<InferAttributes<WorkImagesModel>, InferCreationAttributes<WorkImagesModel>> {
  declare id: CreationOptional<number>;
  declare image: string;
  declare workId: ForeignKey<WorkModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    images: Association<WorkImagesModel, WorkModel>;
  };
}

WorkImagesModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'works-images',
  },
);

WorkModel.hasMany(WorkImagesModel, {
  sourceKey: 'id',
  foreignKey: 'workId',
  as: 'images',
});
WorkImagesModel.belongsTo(WorkModel, {
  foreignKey: 'workId',
  as: 'works',
});
export default WorkImagesModel;
