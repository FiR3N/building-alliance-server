import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
import WorkModel from './WorkModel.js';
class WorkImagesModel extends Model {
}
WorkImagesModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'works-images',
});
WorkModel.hasMany(WorkImagesModel, {
    sourceKey: 'id',
    foreignKey: 'workId',
    as: 'images',
});
WorkImagesModel.belongsTo(WorkModel, {
    foreignKey: 'workId',
    as: 'works',
});
export default WorkImagesModel;
//# sourceMappingURL=WorkImagesModel.js.map