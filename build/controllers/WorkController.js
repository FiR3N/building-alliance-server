import { WorkModel, WorkImagesModel, WorkInfosModel } from '../models/models.js';
import ApiError from '../exceptions/ApiError.js';
import WorkService from '../services/WorkService.js';
class WorkController {
    async addWork(req, res, next) {
        var _a, _b;
        try {
            const { name, info, date } = req.body;
            let image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            let imageList = (_b = req.files) === null || _b === void 0 ? void 0 : _b.imageList;
            const workWithInfosAndImages = await WorkService.addWork(name, image, date, info, imageList);
            return res.status(200).json(workWithInfosAndImages);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    async putWork(req, res, next) {
        var _a, _b;
        try {
            const workId = Number(req.params.workId);
            const { name, info, date } = req.body;
            let img = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            let imageList = (_b = req.files) === null || _b === void 0 ? void 0 : _b.imageList;
            const updatedWorkWithInfosAndImages = await WorkService.putWork(workId, name, img, date, info, next, imageList && imageList);
            return res.status(200).json(updatedWorkWithInfosAndImages);
        }
        catch (e) {
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
                    { model: WorkImagesModel, as: 'images', order: [['id', 'ASC']] },
                    { model: WorkInfosModel, as: 'infos', order: [['id', 'ASC']] },
                ],
                order: [['id', 'ASC']],
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
                    { model: WorkInfosModel, as: 'infos', order: [['id', 'ASC']] },
                    { model: WorkImagesModel, as: 'images', order: [['id', 'ASC']] },
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