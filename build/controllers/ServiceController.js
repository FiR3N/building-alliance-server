import { ServiceModel, ServicesInfosModel } from '../models/models.js';
import ApiError from '../exceptions/ApiError.js';
import ServiceModelService from '../services/ServiceModelService.js';
class ServiceController {
    async addService(req, res, next) {
        var _a;
        try {
            const { name, info } = req.body;
            let image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const serviceWithInfo = await ServiceModelService.addService(name, image, info);
            return res.status(200).json(serviceWithInfo);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    async putService(req, res, next) {
        var _a;
        try {
            const serviceId = Number(req.params.serviceId);
            const { name, info } = req.body;
            let image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const service = await ServiceModelService.putService(serviceId, name, image, info);
            return res.status(200).json(service);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteService(req, res, next) {
        try {
            const serviceId = Number(req.params.serviceId);
            const service = await ServiceModelService.deleteService(serviceId, next);
            if (!service) {
                return next(ApiError.BadRequest('Услуга с таким Id не найдена', []));
            }
            return res.status(200).json(service);
        }
        catch (e) {
            next(e);
        }
    }
    async getServices(req, res, next) {
        try {
            let limit = Number(req.query.limit) || 9;
            let page = Number(req.query.page) || 1;
            let offset = page * limit - limit;
            const services = await ServiceModel.findAndCountAll({
                include: [{ model: ServicesInfosModel, as: 'infos' }],
                order: [
                    ['id', 'ASC'],
                    [{ model: ServicesInfosModel, as: 'infos' }, 'id'],
                ],
                limit,
                offset,
                distinct: true,
            });
            return res.status(200).json(services);
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
    async getServiceById(req, res, next) {
        try {
            let serviceId = Number(req.params.serviceId);
            const service = await ServiceModel.findOne({
                where: { id: serviceId },
                include: [{ model: ServicesInfosModel, as: 'infos' }],
                order: [
                    ['id', 'ASC'],
                    [{ model: ServicesInfosModel, as: 'infos' }, 'id'],
                ],
            });
            return res.status(200).json(service);
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
}
export default new ServiceController();
//# sourceMappingURL=ServiceController.js.map