import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
import NewsModel from './NewsModel.js';
class NewsInfosModel extends Model {
}
NewsInfosModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'news-infos',
});
NewsModel.hasMany(NewsInfosModel, {
    sourceKey: 'id',
    foreignKey: 'newsId',
    as: 'infos',
});
NewsInfosModel.belongsTo(NewsModel, {
    foreignKey: 'newsId',
    as: 'news',
});
export default NewsInfosModel;
//# sourceMappingURL=NewsInfosModel.js.map