import { NextFunction, Request, Response } from 'express';
import { News, NewsInfos } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import NewsService from '../services/NewsService.js';
import { Op } from 'sequelize';

class NewsController {
  async addNews(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, info } = req.body;
      let img = req.files?.img as UploadedFile;

      const employeeWithInfo = await NewsService.addNews(name, description, img, info);

      return res.status(200).json(employeeWithInfo);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putNews(req: Request, res: Response, next: NextFunction) {
    try {
      const newsId = Number(req.params.newsId);
      const { name, description, info } = req.body;
      let img = req.files?.img as UploadedFile;

      const news = await NewsService.putNews(newsId, name, description, img, info);

      return res.status(200).json(news);
    } catch (e) {
      next(e);
    }
  }
  async deleteNews(req: Request, res: Response, next: NextFunction) {
    try {
      const newsId = Number(req.params.newsId);

      const news = await NewsService.deleteNews(newsId, next);

      if (!news) {
        return next(ApiError.BadRequest('Новость с таким Id не найдена', []));
      }

      return res.status(200).json(news);
    } catch (e) {
      next(e);
    }
  }
  async getNews(req: Request, res: Response, next: NextFunction) {
    try {
      let limit = Number(req.query.limit);
      let page = Number(req.query.page);
      const searchName = req.query.name;

      const whereSeacrhName: any = {};
      if (searchName) {
        whereSeacrhName.name = { [Op.like]: `%${searchName}%` };
      }

      let offset = page * limit - limit;

      const news = await News.findAndCountAll({
        where: whereSeacrhName,
        include: [{ model: NewsInfos, as: 'infos', order: [['id', 'ASC']] }],
        limit,
        offset,
        distinct: true,
      });

      return res.status(200).json(news);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new NewsController();
