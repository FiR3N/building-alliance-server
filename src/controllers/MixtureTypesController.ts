import { NextFunction, Request, Response } from 'express';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import MixtureTypesService from '../services/MixtureTypesService.js';

class MixtureTypesController {
  async addMixtureType(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const mixtureType = await MixtureTypesService.addMixtureType(name);

      return res.status(200).json(mixtureType);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putMixtureType(req: Request, res: Response, next: NextFunction) {
    try {
      const mixtureTypeId = Number(req.params.mixtureTypeId);
      const { name } = req.body;

      const updatedMixtureType = await MixtureTypesService.putMixtureType(mixtureTypeId, name);

      return res.status(200).json(updatedMixtureType);
    } catch (e) {
      next(e);
    }
  }
  async deleteMixtureType(req: Request, res: Response, next: NextFunction) {
    try {
      const mixtureTypeId = Number(req.params.mixtureTypeId);

      const mixtureType = await MixtureTypesService.deleteMixtureType(mixtureTypeId);

      if (!mixtureType) {
        return next(ApiError.BadRequest('Тип раствора с таким Id не найдена', []));
      }

      return res.status(200).json(mixtureType);
    } catch (e) {
      next(e);
    }
  }
  async getMixtureTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const mixtureTypes = await MixtureTypesService.getMixtureTypes();

      return res.status(200).json(mixtureTypes);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new MixtureTypesController();
