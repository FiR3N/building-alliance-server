import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
import News from './NewsModel.js';
class NewsImages extends Model {
}
NewsImages.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'news-images',
});
News.hasMany(NewsImages, {
    sourceKey: 'id',
    foreignKey: 'newsId',
    as: 'images',
});
NewsImages.belongsTo(News, {
    foreignKey: 'newsId',
    as: 'news',
});
export default NewsImages;
//# sourceMappingURL=NewsImage.js.map