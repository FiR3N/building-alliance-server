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

class Employees extends Model<InferAttributes<Employees>, InferCreationAttributes<Employees>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare surname: string;
  declare patronymic: string;
  declare post: string;
  declare img: string;
  declare telephone: string;
  declare email: string;
  declare isShowable: boolean;
  declare entry_to_work: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Employees.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    post: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true },
    telephone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    isShowable: { type: DataTypes.BOOLEAN, allowNull: false },
    entry_to_work: { type: DataTypes.DATE, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'employees',
  },
);

News.hasMany(NewsInfos, {
  sourceKey: 'id',
  foreignKey: 'newsId',
  as: 'news-infos',
});
NewsInfos.belongsTo(News);

export { News, NewsInfos, Employees };
