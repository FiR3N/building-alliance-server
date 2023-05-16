import ApiError from '../exceptions/ApiError.js';
import VacancyService from '../services/VacancyService.js';
class VacancyController {
    async addVacancy(req, res, next) {
        try {
            const { name, wage, occupation, experience, description } = req.body;
            const vacancy = await VacancyService.addVacancy(name, wage, experience, occupation, description);
            return res.status(200).json(vacancy);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    async putVacancy(req, res, next) {
        try {
            const vacancyId = Number(req.params.vacancyId);
            const { name, wage, occupation, experience, description } = req.body;
            const updatedVacancy = await VacancyService.putVacancy(vacancyId, name, wage, occupation, experience, description);
            return res.status(200).json(updatedVacancy);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteVakancy(req, res, next) {
        try {
            const vacancyId = Number(req.params.vacancyId);
            const vakancy = await VacancyService.deleteVacancy(vacancyId);
            if (!vakancy) {
                return next(ApiError.BadRequest('Услуга с таким Id не найдена', []));
            }
            return res.status(200).json(vakancy);
        }
        catch (e) {
            next(e);
        }
    }
    async getVacancies(req, res, next) {
        try {
            const vacancies = await VacancyService.getVacancies();
            return res.status(200).json(vacancies);
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
}
export default new VacancyController();
//# sourceMappingURL=VacancyController.js.map