import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
class WorkModel extends Model {
}
WorkModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'works',
});
export default WorkModel;
//# sourceMappingURL=WorkModel.js.map