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

class WorkInfosModel extends Model<InferAttributes<WorkInfosModel>, InferCreationAttributes<WorkInfosModel>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare workId: ForeignKey<WorkModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    infos: Association<WorkInfosModel, WorkModel>;
  };
}

WorkInfosModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'works-infos',
  },
);

WorkModel.hasMany(WorkInfosModel, {
  sourceKey: 'id',
  foreignKey: 'workId',
  as: 'infos',
});
WorkInfosModel.belongsTo(WorkModel, {
  foreignKey: 'workId',
  as: 'works',
});

export default WorkInfosModel;
