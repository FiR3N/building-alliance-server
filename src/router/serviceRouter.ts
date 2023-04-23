import Router from 'express';
import ServiceController from '../controllers/ServiceController.js';

const serviceRouter = Router();
serviceRouter.get('/', ServiceController.getServices);
serviceRouter.get('/:serviceId', ServiceController.getServiceById);
serviceRouter.post('/', ServiceController.addService);
serviceRouter.delete('/:serviceId', ServiceController.deleteService);
serviceRouter.put('/:serviceId', ServiceController.putService);

export default serviceRouter;
