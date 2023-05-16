import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import VacancyController from '../controllers/VacancyController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const vacancyRouter = Router();
vacancyRouter.get('/', VacancyController.getVacancies);
vacancyRouter.post('/', authMiddleware, checkRoleMiddleware([1, 3]), VacancyController.addVacancy);
vacancyRouter.delete('/:vacancyId', authMiddleware, checkRoleMiddleware([1, 3]), VacancyController.deleteVakancy);
vacancyRouter.put('/:vacancyId', authMiddleware, checkRoleMiddleware([1, 3]), VacancyController.putVacancy);
export default vacancyRouter;
//# sourceMappingURL=vacanciesRouter.js.map