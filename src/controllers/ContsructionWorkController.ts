import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import ConstructionWorksService from '../services/ConstructionWorksService.js';
import ConstructionWorks from '../models/ConstructionWorks.js';
import ConstructionWorksInfos from '../models/ConstructionWorksInfos.js';

class ConstructionWorksController {
  async addConstructionWork(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, value, info } = req.body;
      let img = req.files?.img as UploadedFile;
      const constructionWorkWithInfo = await ConstructionWorksService.addConstructionWork(
        name,
        description,
        img,
        price,
        value,
        info,
      );
      return res.status(200).json(constructionWorkWithInfo);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putConstructionWork(req: Request, res: Response, next: NextFunction) {
    try {
      const constructionWorkId = Number(req.params.constructionWorkId);
      const { name, description, price, value, info } = req.body;
      let img = req.files?.img as UploadedFile;
      const constructionWork = await ConstructionWorksService.putConstructionWork(
        constructionWorkId,
        name,
        description,
        img,
        price,
        value,
        info,
      );
      return res.status(200).json(constructionWork);
    } catch (e) {
      next(e);
    }
  }
  async deleteConstructionWork(req: Request, res: Response, next: NextFunction) {
    try {
      const constructionWorkId = Number(req.params.constructionWorkId);
      const constructionWork = await ConstructionWorksService.deleteConstructionWork(constructionWorkId, next);
      if (!constructionWork) {
        return next(ApiError.BadRequest('Рементная работа с таким Id не найдена', []));
      }
      return res.status(200).json(constructionWork);
    } catch (e) {
      next(e);
    }
  }
  async getConstructionWork(req: Request, res: Response, next: NextFunction) {
    try {
      const constructionWork = await ConstructionWorks.findAll({
        include: [{ model: ConstructionWorksInfos, as: 'infos', order: [['id', 'ASC']] }],
        order: [['id', 'ASC']],
      });
      return res.status(200).json(constructionWork);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new ConstructionWorksController();
