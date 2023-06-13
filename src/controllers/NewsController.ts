import { NextFunction, Request, Response } from 'express';
import { NewsModel, NewsInfosModel } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import NewsService from '../services/NewsService.js';
import { Op } from 'sequelize';

class NewsController {
  async addNews(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, info, date } = req.body;
      let image = req.files?.image as UploadedFile;

      const newsWithInfo = await NewsService.addNews(name, description, image, info, date);

      return res.status(200).json(newsWithInfo);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putNews(req: Request, res: Response, next: NextFunction) {
    try {
      const newsId = Number(req.params.newsId);
      const { name, description, info, date } = req.body;
      let image = req.files?.image as UploadedFile;

      const news = await NewsService.putNews(newsId, name, description, image, info, date, next);

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
      let limit = Number(req.query.limit) || 9;
      let page = Number(req.query.page) || 1;
      let searchName = req.query.name as string;

      const news = await NewsService.getNews(limit, page, searchName);

      return res.status(200).json(news);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getNewsById(req: Request, res: Response, next: NextFunction) {
    try {
      let newsId = Number(req.params.newsId);

      const news = await NewsService.getNewsById(newsId);

      return res.status(200).json(news);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new NewsController();
