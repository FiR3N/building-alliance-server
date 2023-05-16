import sequelize from '../db.js';
import { DataTypes, Model, } from 'sequelize';
class VacancyModel extends Model {
}
VacancyModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    wage: { type: DataTypes.DOUBLE, allowNull: true },
    experience: { type: DataTypes.STRING, allowNull: false },
    occupation: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    tableName: 'vacancies',
});
export default VacancyModel;
//# sourceMappingURL=VacancyModel.js.map