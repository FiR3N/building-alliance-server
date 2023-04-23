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
import ServicesModel from './ServicesModel.js';

class ServicesInfosModel extends Model<
  InferAttributes<ServicesInfosModel>,
  InferCreationAttributes<ServicesInfosModel>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare serviceId: ForeignKey<ServicesModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    infos: Association<ServicesInfosModel, ServicesModel>;
  };
}

ServicesInfosModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'services-infos',
  },
);

ServicesModel.hasMany(ServicesInfosModel, {
  sourceKey: 'id',
  foreignKey: 'serviceId',
  as: 'infos',
});
ServicesInfosModel.belongsTo(ServicesModel, {
  foreignKey: 'serviceId',
  as: 'services',
});

export default ServicesInfosModel;
