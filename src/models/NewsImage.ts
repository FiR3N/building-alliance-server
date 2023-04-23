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
import News from './NewsModel.js';

class NewsImages extends Model<InferAttributes<NewsImages>, InferCreationAttributes<NewsImages>> {
  declare id: CreationOptional<number>;
  declare image: string;
  declare newsId: ForeignKey<News['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    images: Association<NewsImages, News>;
  };
}

NewsImages.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'news-images',
  },
);

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
