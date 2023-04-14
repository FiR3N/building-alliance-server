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
import ConstructionWorks from './ConstructionWorks.js';

class ConstructionWorksInfos extends Model<
  InferAttributes<ConstructionWorksInfos>,
  InferCreationAttributes<ConstructionWorksInfos>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare constructionworksId: ForeignKey<ConstructionWorks['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ConstructionWorksInfos.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'construction-works-infos',
  },
);

ConstructionWorks.hasMany(ConstructionWorksInfos, {
  sourceKey: 'id',
  foreignKey: 'constructionworksId',
  as: 'infos',
});
ConstructionWorksInfos.belongsTo(ConstructionWorks, {
  foreignKey: 'constructionworksId',
  as: 'construction-works',
});

export default ConstructionWorksInfos;
