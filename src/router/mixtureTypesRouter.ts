import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import MixtureTypesController from '../controllers/MixtureTypesController.js';

const mixtureTypesRouter = Router();
mixtureTypesRouter.get('/', MixtureTypesController.getMixtureTypes);
mixtureTypesRouter.post('/', authMiddleware, checkRoleMiddleware([1, 3]), MixtureTypesController.addMixtureType);
mixtureTypesRouter.delete(
  '/:mixtureTypeId',
  authMiddleware,
  checkRoleMiddleware([1, 3]),
  MixtureTypesController.deleteMixtureType,
);
mixtureTypesRouter.put(
  '/:mixtureTypeId',
  authMiddleware,
  checkRoleMiddleware([1, 3]),
  MixtureTypesController.putMixtureType,
);

export default mixtureTypesRouter;
