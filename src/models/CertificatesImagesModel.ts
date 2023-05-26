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
import CertificatesModel from './CertificatesModel.js';

class CertificatesImagesModel extends Model<
  InferAttributes<CertificatesImagesModel>,
  InferCreationAttributes<CertificatesImagesModel>
> {
  declare id: CreationOptional<number>;
  declare image: string;
  declare certificateId: ForeignKey<CertificatesModel['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    images: Association<CertificatesImagesModel, CertificatesModel>;
  };
}

CertificatesImagesModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'certificates-images',
  },
);

CertificatesModel.hasMany(CertificatesImagesModel, {
  sourceKey: 'id',
  foreignKey: 'certificateId',
  as: 'images',
});
CertificatesImagesModel.belongsTo(CertificatesModel, {
  foreignKey: 'certificateId',
  as: 'certificates',
});
export default CertificatesImagesModel;
