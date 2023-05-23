import { NextFunction, Request, Response } from 'express';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import MixturesService from '../services/MixturesService.js';

class MixturesController {
  async addMixture(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, unitOfMeasurement, typeId, priceWithVAT, priceWithoutVAT } = req.body;

      const mixture = await MixturesService.addMixture(name, unitOfMeasurement, priceWithVAT, priceWithoutVAT, typeId);

      return res.status(200).json(mixture);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putMixture(req: Request, res: Response, next: NextFunction) {
    try {
      const mixtureId = Number(req.params.mixtureId);
      const { name, unitOfMeasurement, typeId, priceWithVAT, priceWithoutVAT } = req.body;

      const updatedMixture = await MixturesService.putMixture(
        mixtureId,
        name,
        unitOfMeasurement,
        priceWithVAT,
        priceWithoutVAT,
        typeId,
      );

      return res.status(200).json(updatedMixture);
    } catch (e) {
      next(e);
    }
  }
  async deleteMixture(req: Request, res: Response, next: NextFunction) {
    try {
      const mixtureId = Number(req.params.mixtureId);

      const mixture = await MixturesService.deleteMixture(mixtureId);

      if (!mixture) {
        return next(ApiError.BadRequest('Раствор с таким Id не найдена', []));
      }

      return res.status(200).json(mixture);
    } catch (e) {
      next(e);
    }
  }
  async getMixtures(req: Request, res: Response, next: NextFunction) {
    try {
      const mixtures = await MixturesService.getMixtures();

      return res.status(200).json(mixtures);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getMixturesByTypeId(req: Request, res: Response, next: NextFunction) {
    try {
      const mixtureTypeId = Number(req.params.mixtureTypeId);

      const mixturesByTypeId = await MixturesService.getMixturesByTypeId(mixtureTypeId);

      return res.status(200).json(mixturesByTypeId);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new MixturesController();
