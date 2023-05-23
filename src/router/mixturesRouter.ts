import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import MixturesController from '../controllers/MixturesController.js';

const mixturesRouter = Router();
mixturesRouter.get('/', MixturesController.getMixtures);
mixturesRouter.get('/:mixtureTypeId', MixturesController.getMixturesByTypeId);
mixturesRouter.post('/', MixturesController.addMixture);
mixturesRouter.delete('/:mixtureId', authMiddleware, checkRoleMiddleware([1, 3]), MixturesController.deleteMixture);
mixturesRouter.put('/:mixtureId', authMiddleware, checkRoleMiddleware([1, 3]), MixturesController.deleteMixture);

export default mixturesRouter;
