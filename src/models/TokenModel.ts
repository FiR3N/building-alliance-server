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
import UserModel from './UserModel.js';

class TokenModel extends Model<InferAttributes<TokenModel>, InferCreationAttributes<TokenModel>> {
  declare id: CreationOptional<number>;
  declare refreshToken: string;
  declare userId: ForeignKey<UserModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    infos: Association<TokenModel, UserModel>;
  };
}

TokenModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'tokens',
  },
);

UserModel.hasMany(TokenModel, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'tokens',
});
TokenModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'users',
});

export default TokenModel;
