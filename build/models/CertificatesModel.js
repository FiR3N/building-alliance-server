import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
class CertificatesModel extends Model {
}
CertificatesModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'certificates',
});
export default CertificatesModel;
//# sourceMappingURL=CertificatesModel.js.map