import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
import ServicesModel from './ServicesModel.js';
class ServicesInfosModel extends Model {
}
ServicesInfosModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'services-infos',
});
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
//# sourceMappingURL=ServicesInfosModel.js.map