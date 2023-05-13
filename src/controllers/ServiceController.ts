import { NextFunction, Request, Response } from 'express';
import { ServiceModel, ServicesInfosModel } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import ServiceModelService from '../services/ServiceModelService.js';
import { Op } from 'sequelize';

class ServiceController {
  async addService(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, info } = req.body;
      let image = req.files?.image as UploadedFile;

      const serviceWithInfo = await ServiceModelService.addService(name, image, info);

      return res.status(200).json(serviceWithInfo);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putService(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceId = Number(req.params.serviceId);
      const { name, info } = req.body;
      let image = req.files?.image as UploadedFile;

      const service = await ServiceModelService.putService(serviceId, name, image, info);

      return res.status(200).json(service);
    } catch (e) {
      next(e);
    }
  }
  async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceId = Number(req.params.serviceId);

      const service = await ServiceModelService.deleteService(serviceId, next);

      if (!service) {
        return next(ApiError.BadRequest('Услуга с таким Id не найдена', []));
      }

      return res.status(200).json(service);
    } catch (e) {
      next(e);
    }
  }
  async getServices(req: Request, res: Response, next: NextFunction) {
    try {
      let limit = Number(req.query.limit) || 9;
      let page = Number(req.query.page) || 1;

      let offset = page * limit - limit;

      const services = await ServiceModel.findAndCountAll({
        include: [{ model: ServicesInfosModel, as: 'infos', order: [['id', 'DESC']] }],
        limit,
        offset,
        distinct: true,
      });

      return res.status(200).json(services);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getServiceById(req: Request, res: Response, next: NextFunction) {
    try {
      let serviceId = Number(req.params.serviceId);

      const service = await ServiceModel.findOne({
        where: { id: serviceId },
      });

      return res.status(200).json(service);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new ServiceController();
