import { NextFunction, Request, Response } from 'express';
import { News, NewsInfos, Vehicles, VehiclesInfos } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import { Op } from 'sequelize';
import VehicleService from '../services/VehicleService.js';

class VehicleController {
  async addVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, count, pricePerHour, yearProduction, info } = req.body;
      let img = req.files?.img as UploadedFile;

      const vehicleWithInfo = await VehicleService.addVehicle(
        name,
        description,
        img,
        count,
        pricePerHour,
        yearProduction,
        info,
      );

      return res.status(200).json(vehicleWithInfo);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleId = Number(req.params.vehicleId);
      const { name, description, count, pricePerHour, yearProduction, info } = req.body;
      let img = req.files?.img as UploadedFile;

      const vehicle = await VehicleService.putVehicle(
        vehicleId,
        name,
        description,
        img,
        count,
        pricePerHour,
        yearProduction,
        info,
      );

      return res.status(200).json(vehicle);
    } catch (e) {
      next(e);
    }
  }
  async deleteVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleId = Number(req.params.vehicleId);

      const vehicle = await VehicleService.deleteVehicle(vehicleId, next);

      if (!vehicle) {
        return next(ApiError.BadRequest('Транспортной средство с таким Id не найдено', []));
      }

      return res.status(200).json(vehicle);
    } catch (e) {
      next(e);
    }
  }
  async getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicle = await Vehicles.findAll({
        include: [{ model: VehiclesInfos, as: 'infos', order: [['id', 'DESC']] }],
      });

      return res.status(200).json(vehicle);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new VehicleController();
