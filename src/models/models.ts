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

class News extends Model<InferAttributes<News>, InferCreationAttributes<News>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare img: string;
  //   declare userId: ForeignKey<UserModel["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

News.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'news',
  },
);

class NewsInfos extends Model<InferAttributes<NewsInfos>, InferCreationAttributes<NewsInfos>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare userId: ForeignKey<News['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
  as: 'news-infos',
});
NewsInfos.belongsTo(News);

export { News, NewsInfos };
