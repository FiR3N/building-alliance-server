import { NextFunction, Request, Response } from 'express';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import VehicleService from '../services/VehicleService.js';

class VehicleController {
  async addVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, priceWithVAT, priceWithoutVAT } = req.body;

      const vehicle = await VehicleService.addVehicle(name, priceWithVAT, priceWithoutVAT);

      return res.status(200).json(vehicle);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleId = Number(req.params.vehicleId);
      const { name, priceWithVAT, priceWithoutVAT } = req.body;

      const updatedVehicle = await VehicleService.putVehicle(vehicleId, name, priceWithVAT, priceWithoutVAT);

      return res.status(200).json(updatedVehicle);
    } catch (e) {
      next(e);
    }
  }
  async deleteVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleId = Number(req.params.vehicleId);

      const vehicle = await VehicleService.deleteVehicle(vehicleId);

      if (!vehicle) {
        return next(ApiError.BadRequest('Машина с таким Id не найдена', []));
      }

      return res.status(200).json(vehicle);
    } catch (e) {
      next(e);
    }
  }
  async getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = await VehicleService.getVehicles();

      return res.status(200).json(vehicles);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new VehicleController();
