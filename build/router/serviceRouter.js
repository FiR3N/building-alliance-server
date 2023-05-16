import Router from 'express';
import ServiceController from '../controllers/ServiceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const serviceRouter = Router();
serviceRouter.get('/', ServiceController.getServices);
serviceRouter.get('/:serviceId', ServiceController.getServiceById);
serviceRouter.post('/', authMiddleware, ServiceController.addService);
serviceRouter.delete('/:serviceId', authMiddleware, ServiceController.deleteService);
serviceRouter.put('/:serviceId', authMiddleware, ServiceController.putService);
export default serviceRouter;
//# sourceMappingURL=serviceRouter.js.map