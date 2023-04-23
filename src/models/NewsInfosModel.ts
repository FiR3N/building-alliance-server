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
import NewsModel from './NewsModel.js';

class NewsInfosModel extends Model<InferAttributes<NewsInfosModel>, InferCreationAttributes<NewsInfosModel>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare newsId: ForeignKey<NewsModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    infos: Association<NewsInfosModel, NewsModel>;
  };
}

NewsInfosModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'news-infos',
  },
);

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
