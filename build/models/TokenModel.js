import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
import UserModel from './UserModel.js';
class TokenModel extends Model {
}
TokenModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'tokens',
});
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
//# sourceMappingURL=TokenModel.js.map