import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
class ServicesModel extends Model {
}
ServicesModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'services',
});
export default ServicesModel;
//# sourceMappingURL=ServicesModel.js.map