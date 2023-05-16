import Router from 'express';
import WorkController from '../controllers/WorkController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const workRouter = Router();
workRouter.get('/', WorkController.getWorks);
workRouter.get('/:workId', WorkController.getWorkById);
workRouter.post('/', authMiddleware, checkRoleMiddleware([1, 2]), WorkController.addWork);
workRouter.delete('/:workId', authMiddleware, checkRoleMiddleware([1, 2]), WorkController.deleteWork);
workRouter.put('/:workId', authMiddleware, checkRoleMiddleware([1, 2]), WorkController.putWork);
export default workRouter;
//# sourceMappingURL=workRouter.js.map