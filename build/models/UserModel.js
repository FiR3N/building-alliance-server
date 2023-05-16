import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
import RoleModel from './RoleModel.js';
class UserModel extends Model {
}
UserModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'users',
});
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
//# sourceMappingURL=UserModel.js.map