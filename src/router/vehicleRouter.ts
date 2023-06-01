import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import VehicleController from '../controllers/VehicleController.js';

const vehicleRouter = Router();
vehicleRouter.get('/', VehicleController.getVehicles);
vehicleRouter.post('/', VehicleController.addVehicle);
vehicleRouter.delete('/:mixtureId', authMiddleware, checkRoleMiddleware([1, 3]), VehicleController.deleteVehicle);
vehicleRouter.put('/:mixtureId', authMiddleware, checkRoleMiddleware([1, 3]), VehicleController.putVehicle);

export default vehicleRouter;
