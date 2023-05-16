import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
import WorkModel from './WorkModel.js';
class WorkInfosModel extends Model {
}
WorkInfosModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'works-infos',
});
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
//# sourceMappingURL=WorkInfosModel.js.map