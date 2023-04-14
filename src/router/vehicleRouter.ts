import Router from 'express';
import VehicleContorlle from '../controllers/VehicleContorlle.js';

const vehicleRouter = Router();
vehicleRouter.get('/', VehicleContorlle.getVehicles);
vehicleRouter.post('/', VehicleContorlle.addVehicle);
vehicleRouter.delete('/:vehicleId', VehicleContorlle.deleteVehicle);
vehicleRouter.put('/:vehicleId', VehicleContorlle.putVehicle);

export default vehicleRouter;
