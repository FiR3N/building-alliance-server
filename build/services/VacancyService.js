import VacancyModel from '../models/VacancyModel.js';
class VacancyService {
    async addVacancy(name, wage, experience, occupation, description) {
        const vacancy = await VacancyModel.create({
            name: name,
            wage,
            experience: experience,
            occupation: occupation,
            description: description,
        });
        return vacancy;
    }
    async putVacancy(vacancyId, name, wage, experience, occupation, description) {
        await VacancyModel.update({
            name,
            wage,
            experience,
            occupation,
            description,
        }, { where: { $id$: vacancyId } });
        const updatedVacancy = await VacancyModel.findOne({
            where: { id: vacancyId },
        });
        return updatedVacancy;
    }
    async deleteVacancy(vacancyId) {
        const vacancy = await VacancyModel.findOne({ where: { $id$: vacancyId } });
        await VacancyModel.destroy({ where: { $id$: vacancyId } });
        return vacancy;
    }
    async getVacancies() {
        const vacancies = await VacancyModel.findAll({ order: [['id', 'ASC']] });
        return vacancies;
    }
}
export default new VacancyService();
//# sourceMappingURL=VacancyService.js.map