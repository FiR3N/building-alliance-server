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
import RoleModel from './RoleModel.js';

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare surname: string;
  declare patronymic: string;
  declare password: string;
  declare login: string;
  declare image: string;
  declare roleId: ForeignKey<RoleModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    infos: Association<UserModel, RoleModel>;
  };
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'users',
  },
);

RoleModel.hasMany(UserModel, {
  sourceKey: 'id',
  foreignKey: 'roleId',
  as: 'users',
});
UserModel.belongsTo(RoleModel, {
  foreignKey: 'roleId',
  as: 'roles',
});

export default UserModel;
