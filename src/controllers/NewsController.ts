import { NextFunction, Request, Response } from 'express';
import { News, NewsInfos } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import NewsService from '../services/NewsService.js';

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
      // let limit = Number(req.query.limit);
      // let page = Number(req.query.page);
      // let offset = page * limit - limit;
      // const employees = await Employees.findAndCountAll({ limit: limit, offset: offset });
      const news = await News.findAll({ include: [{ model: NewsInfos, as: 'infos' }] });
      return res.status(200).json(news);
    } catch (e) {
      next(e);
    }
  }
}

export default new NewsController();
