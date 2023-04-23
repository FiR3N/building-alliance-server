import { NewsModel, NewsInfosModel } from '../models/models.js';
import { NEWS_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class NewsService {
  async addNews(name: string, description: string, img: UploadedFile, info: string, date: string) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      await img.mv(path.resolve(__dirname, 'static', 'news', imgPathname));
    } else {
      imgPathname = NEWS_PLUG_IMG;
    }

    // const newDate = new Date(date).toISOString().slice(0, 10)
    const newDate = new Date(Date.parse(date));
    const news = await NewsModel.create({
      name,
      description,
      img: imgPathname,
      date: newDate,
    });

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          return NewsInfosModel.create({
            description: item.description,
            newsId: news.id,
          });
        }),
      );
    }

    const newsWithInfos = await NewsModel.findOne({
      where: { id: news.id },
      include: [{ model: NewsInfosModel, as: 'infos' }],
    });

    return newsWithInfos;
  }

  async putNews(newsId: number, name: string, description: string, img: UploadedFile, info: string, date: string) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static', 'employees', imgPathname));
    } else {
      imgPathname = NEWS_PLUG_IMG;
    }

    const newDate = new Date(Date.parse(date));

    await NewsModel.update(
      {
        name,
        description,
        img: imgPathname,
        date: newDate,
      },
      { where: { $id$: newsId } },
    );

    const infos = await NewsInfosModel.findAll({ where: { newsId: newsId } });

    const infosId = infos.map((item) => item.id);

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          if (infosId.includes(parseInt(item.id))) {
            return NewsInfosModel.update({ description: item.description }, { where: { id: item.id } });
          } else {
            return NewsInfosModel.create({
              description: item.description,
              newsId: newsId,
            });
          }
        }),
      );
    }

    const newsWithInfos = await NewsModel.findOne({
      where: { id: newsId },
      include: [{ model: NewsInfosModel, as: 'infos', order: [['id', 'DESC']] }],
    });

    return newsWithInfos;
  }

  async deleteNews(newsId: number, next: NextFunction) {
    const news = await NewsModel.findOne({ where: { $id$: newsId } });
    if (news)
      if (news?.img != NEWS_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'news', news?.img!), (err: any) => {
          if (err) next(err);
          console.log(`news/${news?.img}.jpg was deleted`);
        });
      }
    await NewsInfosModel.destroy({ where: { $newsId$: newsId } });

    await NewsModel.destroy({ where: { $id$: newsId } });
    return news;
  }
}

export default new NewsService();
