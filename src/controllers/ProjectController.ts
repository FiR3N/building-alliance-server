import { NextFunction, Request, Response } from 'express';
import { ProjectImagesModel, ProjectInfosModel, ProjectModel } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import { Op } from 'sequelize';
import ProjectService from '../services/ProjectService.js';

class ProjectController {
  async addProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, info, date } = req.body;
      let image = req.files?.image as UploadedFile;
      let imageList = req.files?.imageList as UploadedFile[];

      const projectWithInfosAndImages = await ProjectService.addProject(name, image, date, info, imageList);

      return res.status(200).json(projectWithInfosAndImages);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = Number(req.params.projectId);
      const { name, info, date } = req.body;
      let img = req.files?.image as UploadedFile;
      let imageList = req.files?.imageList as UploadedFile[];

      const updatedProjectWithInfosAndImages = await ProjectService.putService(
        projectId,
        name,
        img,
        date,
        info,
        next,
        imageList && imageList,
      );

      return res.status(200).json(updatedProjectWithInfosAndImages);
    } catch (e) {
      next(e);
    }
  }
  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = Number(req.params.projectId);

      const project = await ProjectService.deleteProject(projectId, next);

      if (!project) {
        return next(ApiError.BadRequest('Проект с таким Id не найдена', []));
      }

      return res.status(200).json(project);
    } catch (e) {
      next(e);
    }
  }
  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      let limit = Number(req.query.limit) || 9;
      let page = Number(req.query.page) || 1;

      let offset = page * limit - limit;

      const projects = await ProjectModel.findAndCountAll({
        include: [
          { model: ProjectInfosModel, as: 'infos', order: [['id', 'ASC']] },
          { model: ProjectImagesModel, as: 'images', order: [['id', 'ASC']] },
        ],
        limit,
        offset,
        distinct: true,
      });
      return res.status(200).json(projects);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      let projectId = Number(req.params.projectId);

      const projectWithInfosAndImages = await ProjectModel.findOne({
        where: { id: projectId },
        include: [
          { model: ProjectInfosModel, as: 'infos', order: [['id', 'ASC']] },
          { model: ProjectImagesModel, as: 'images', order: [['id', 'ASC']] },
        ],
      });

      return res.status(200).json(projectWithInfosAndImages);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new ProjectController();
