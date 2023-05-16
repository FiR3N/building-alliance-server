import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
class RoleModel extends Model {
}
RoleModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'roles',
});
export default RoleModel;
//# sourceMappingURL=RoleModel.js.map