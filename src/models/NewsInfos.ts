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
import News from './News.js';

class NewsInfos extends Model<InferAttributes<NewsInfos>, InferCreationAttributes<NewsInfos>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare newsId: ForeignKey<News['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    infos: Association<NewsInfos, News>;
  };
}

NewsInfos.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'news-infos',
  },
);

News.hasMany(NewsInfos, {
  sourceKey: 'id',
  foreignKey: 'newsId',
  as: 'infos',
});
NewsInfos.belongsTo(News, {
  foreignKey: 'newsId',
  as: 'news',
});
