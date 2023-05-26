import { NextFunction, Request, Response } from 'express';
import { WorkModel, WorkImagesModel, WorkInfosModel } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import WorkService from '../services/WorkService.js';

class WorkController {
  async addWork(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, info, date } = req.body;
      let image = req.files?.image as UploadedFile;

      const uploadedFiles = req.files;
      const imageList = [] as UploadedFile[];

      for (const key in uploadedFiles) {
        if (key.startsWith('imageList[')) {
          imageList.push(uploadedFiles[key] as UploadedFile);
        }
      }

      const workWithInfosAndImages = await WorkService.addWork(name, image, date, info, imageList);

      return res.status(200).json(workWithInfosAndImages);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putWork(req: Request, res: Response, next: NextFunction) {
    try {
      const workId = Number(req.params.workId);
      const { name, info, date, imageInfo } = req.body;
      let img = req.files?.image as UploadedFile;
      const uploadedFiles = req.files;
      const imageList = [] as UploadedFile[];

      for (const key in uploadedFiles) {
        if (key.startsWith('imageList[')) {
          imageList.push(uploadedFiles[key] as UploadedFile);
        }
      }

      const updatedWorkWithInfosAndImages = await WorkService.putWork(
        workId,
        name,
        img,
        date,
        info,
        next,
        imageInfo,
        imageList && imageList,
      );

      return res.status(200).json(updatedWorkWithInfosAndImages);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async deleteWork(req: Request, res: Response, next: NextFunction) {
    try {
      const workId = Number(req.params.workId);

      const work = await WorkService.deleteWork(workId, next);

      if (!work) {
        return next(ApiError.BadRequest('Работа с таким Id не найдена', []));
      }

      return res.status(200).json(work);
    } catch (e) {
      next(e);
    }
  }
  async getWorks(req: Request, res: Response, next: NextFunction) {
    try {
      let limit = Number(req.query.limit) || 9;
      let page = Number(req.query.page) || 1;

      let offset = page * limit - limit;

      const works = await WorkModel.findAndCountAll({
        include: [
          { model: WorkImagesModel, as: 'images' },
          { model: WorkInfosModel, as: 'infos' },
        ],
        order: [
          ['date', 'DESC'],
          [{ model: WorkInfosModel, as: 'infos' }, 'id'],
          [{ model: WorkImagesModel, as: 'images' }, 'id'],
        ],
        limit,
        offset,
        distinct: true,
      });
      return res.status(200).json(works);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getWorkById(req: Request, res: Response, next: NextFunction) {
    try {
      let workId = Number(req.params.workId);

      const workWithInfosAndImages = await WorkModel.findOne({
        where: { id: workId },
        include: [
          { model: WorkInfosModel, as: 'infos' },
          { model: WorkImagesModel, as: 'images' },
        ],
        order: [
          [{ model: WorkInfosModel, as: 'infos' }, 'id'],
          [{ model: WorkImagesModel, as: 'images' }, 'id'],
        ],
      });

      return res.status(200).json(workWithInfosAndImages);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new WorkController();
