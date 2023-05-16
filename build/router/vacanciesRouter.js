import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import VacancyController from '../controllers/VacancyController.js';
const vacancyRouter = Router();
vacancyRouter.get('/', VacancyController.getVacancies);
vacancyRouter.post('/', VacancyController.addVacancy);
vacancyRouter.delete('/:vacancyId', VacancyController.deleteVakancy);
vacancyRouter.put('/:vacancyId', authMiddleware, VacancyController.putVacancy);
export default vacancyRouter;
//# sourceMappingURL=vacanciesRouter.js.map