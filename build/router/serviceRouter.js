import Router from 'express';
import ServiceController from '../controllers/ServiceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const serviceRouter = Router();
serviceRouter.get('/', ServiceController.getServices);
serviceRouter.get('/:serviceId', ServiceController.getServiceById);
serviceRouter.post('/', authMiddleware, checkRoleMiddleware([1, 3]), ServiceController.addService);
serviceRouter.delete('/:serviceId', authMiddleware, checkRoleMiddleware([1, 3]), ServiceController.deleteService);
serviceRouter.put('/:serviceId', authMiddleware, checkRoleMiddleware([1, 3]), ServiceController.putService);
export default serviceRouter;
//# sourceMappingURL=serviceRouter.js.map