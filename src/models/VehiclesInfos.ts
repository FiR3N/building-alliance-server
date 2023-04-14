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
import Vechicles from './Vehicles.js';

class VehiclesInfos extends Model<InferAttributes<VehiclesInfos>, InferCreationAttributes<VehiclesInfos>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare vehicleId: ForeignKey<Vechicles['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

VehiclesInfos.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'vehicles-infos',
  },
);

Vechicles.hasMany(VehiclesInfos, {
  sourceKey: 'id',
  foreignKey: 'vehicleId',
  as: 'infos',
});
VehiclesInfos.belongsTo(Vechicles, {
  foreignKey: 'vehicleId',
  as: 'vehicle',
});

export default VehiclesInfos;
