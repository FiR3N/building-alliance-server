import { WorkModel, WorkImagesModel, WorkInfosModel } from '../models/models.js';
import ApiError from '../exceptions/ApiError.js';
import WorkService from '../services/WorkService.js';
class WorkController {
    async addWork(req, res, next) {
        var _a;
        try {
            const { name, info, date } = req.body;
            let image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const uploadedFiles = req.files;
            const imageList = [];
            for (const key in uploadedFiles) {
                if (key.startsWith('imageList[')) {
                    imageList.push(uploadedFiles[key]);
                }
            }
            const workWithInfosAndImages = await WorkService.addWork(name, image, date, info, imageList);
            return res.status(200).json(workWithInfosAndImages);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    async putWork(req, res, next) {
        var _a;
        try {
            const workId = Number(req.params.workId);
            const { name, info, date, imageInfo } = req.body;
            let img = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const uploadedFiles = req.files;
            const imageList = [];
            for (const key in uploadedFiles) {
                if (key.startsWith('imageList[')) {
                    imageList.push(uploadedFiles[key]);
                }
            }
            const updatedWorkWithInfosAndImages = await WorkService.putWork(workId, name, img, date, info, next, imageInfo, imageList && imageList);
            return res.status(200).json(updatedWorkWithInfosAndImages);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    async deleteWork(req, res, next) {
        try {
            const workId = Number(req.params.workId);
            const work = await WorkService.deleteWork(workId, next);
            if (!work) {
                return next(ApiError.BadRequest('Работа с таким Id не найдена', []));
            }
            return res.status(200).json(work);
        }
        catch (e) {
            next(e);
        }
    }
    async getWorks(req, res, next) {
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
                    ['date', 'ASC'],
                    [{ model: WorkInfosModel, as: 'infos' }, 'id'],
                    [{ model: WorkImagesModel, as: 'images' }, 'id'],
                ],
                limit,
                offset,
                distinct: true,
            });
            return res.status(200).json(works);
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
    async getWorkById(req, res, next) {
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
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
}
export default new WorkController();
//# sourceMappingURL=WorkController.js.map