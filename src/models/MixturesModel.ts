import sequelize from '../db.js';
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import MixtureTypesModel from './MixtureTypesModel.js';

class MixturesModel extends Model<InferAttributes<MixturesModel>, InferCreationAttributes<MixturesModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare unitOfMeasurement: string;
  declare priceWithVAT: number;
  declare priceWithoutVAT: number;
  declare typeId: ForeignKey<MixtureTypesModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

MixturesModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    unitOfMeasurement: { type: DataTypes.STRING, allowNull: false },
    priceWithVAT: { type: DataTypes.DECIMAL, allowNull: false },
    priceWithoutVAT: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'mixtures',
  },
);

MixtureTypesModel.hasMany(MixturesModel, {
  sourceKey: 'id',
  foreignKey: 'typeId',
  as: 'mixtures',
  onDelete: 'CASCADE',
});
MixturesModel.belongsTo(MixtureTypesModel, {
  foreignKey: 'typeId',
  as: 'mixture-types',
});

export default MixturesModel;
