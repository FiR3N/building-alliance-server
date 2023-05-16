import { NewsModel, NewsInfosModel } from '../models/models.js';
import { NEWS_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { v4 } from 'uuid';
import fs from 'fs';
class NewsService {
    async addNews(name, description, img, info, date) {
        let imgPathname;
        if (img) {
            imgPathname = v4() + '.jpg';
            await img.mv(path.resolve(__dirname, 'static', 'news', imgPathname));
        }
        else {
            imgPathname = NEWS_PLUG_IMG;
        }
        const newDate = new Date(Date.parse(date));
        const news = await NewsModel.create({
            name,
            description,
            img: imgPathname,
            date: newDate,
        });
        if (info) {
            let jsonInfo = JSON.parse(info);
            await Promise.all(jsonInfo.map((item) => {
                return NewsInfosModel.create({
                    description: item.description,
                    newsId: news.id,
                });
            }));
        }
        const newsWithInfos = await NewsModel.findOne({
            where: { id: news.id },
            include: [{ model: NewsInfosModel, as: 'infos' }],
        });
        return newsWithInfos;
    }
    async putNews(newsId, name, description, image, info, date, next) {
        const news = await NewsModel.findOne({ where: { $id$: newsId } });
        let imgPathname = news === null || news === void 0 ? void 0 : news.img;
        const newDate = new Date(Date.parse(date));
        if (image) {
            imgPathname = v4() + '.jpg';
            image.mv(path.resolve(__dirname, 'static', 'news', imgPathname));
            if ((news === null || news === void 0 ? void 0 : news.img) != NEWS_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'news', news === null || news === void 0 ? void 0 : news.img), (err) => {
                    if (err)
                        next(err);
                    console.log(`news/${news === null || news === void 0 ? void 0 : news.img}.jpg was deleted`);
                });
            }
        }
        await NewsModel.update({
            name,
            description,
            img: imgPathname,
            date: newDate,
        }, { where: { $id$: newsId } });
        const infos = await NewsInfosModel.findAll({ where: { newsId: newsId } });
        const infosId = infos.map((item) => item.id);
        if (info) {
            let jsonInfo = JSON.parse(info);
            await Promise.all(jsonInfo.map((item) => {
                if (infosId.includes(parseInt(item.id))) {
                    return NewsInfosModel.update({ description: item.description }, { where: { id: item.id } });
                }
                else {
                    return NewsInfosModel.create({
                        description: item.description,
                        newsId: newsId,
                    });
                }
            }));
            const jsonInfoIds = jsonInfo.map((item) => item.id);
            await Promise.all(infosId.map((id) => {
                if (!jsonInfoIds.includes(id)) {
                    return NewsInfosModel.destroy({ where: { $id$: id } });
                }
            }));
        }
        const newsWithInfos = await NewsModel.findOne({
            where: { id: newsId },
            include: [{ model: NewsInfosModel, as: 'infos', order: [['id', 'DESC']] }],
        });
        return newsWithInfos;
    }
    async deleteNews(newsId, next) {
        const news = await NewsModel.findOne({ where: { $id$: newsId } });
        if (news)
            if ((news === null || news === void 0 ? void 0 : news.img) != NEWS_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'news', news === null || news === void 0 ? void 0 : news.img), (err) => {
                    if (err)
                        next(err);
                    console.log(`news/${news === null || news === void 0 ? void 0 : news.img}.jpg was deleted`);
                });
            }
        await NewsInfosModel.destroy({ where: { $newsId$: newsId } });
        await NewsModel.destroy({ where: { $id$: newsId } });
        return news;
    }
}
export default new NewsService();
//# sourceMappingURL=NewsService.js.map