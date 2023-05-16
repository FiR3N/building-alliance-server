import { ServiceModel, ServicesInfosModel } from '../models/models.js';
import { SERVICE_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { v4 } from 'uuid';
import fs from 'fs';
class ServiceModelService {
    async addService(name, img, info) {
        let imgPathname;
        if (img) {
            imgPathname = v4() + '.jpg';
            await img.mv(path.resolve(__dirname, 'static', 'services', imgPathname));
        }
        else {
            imgPathname = SERVICE_PLUG_IMG;
        }
        const service = await ServiceModel.create({
            name,
            image: imgPathname,
        });
        if (info) {
            let jsonInfo = JSON.parse(info);
            await Promise.all(jsonInfo.map((item) => {
                return ServicesInfosModel.create({
                    description: item.description,
                    serviceId: service.id,
                });
            }));
        }
        const serviceWithInfos = await ServiceModel.findOne({
            where: { id: service.id },
            include: [{ model: ServicesInfosModel, as: 'infos' }],
        });
        return serviceWithInfos;
    }
    async putService(serviceId, name, img, info) {
        let imgPathname;
        if (img) {
            imgPathname = v4() + '.jpg';
            img.mv(path.resolve(__dirname, 'static', 'services', imgPathname));
        }
        else {
            imgPathname = SERVICE_PLUG_IMG;
        }
        await ServiceModel.update({
            name,
            image: imgPathname,
        }, { where: { $id$: serviceId } });
        const infos = await ServicesInfosModel.findAll({ where: { $serviceId$: serviceId } });
        const infosId = infos.map((item) => item.id);
        if (info) {
            let jsonInfo = JSON.parse(info);
            await Promise.all(jsonInfo.map((item) => {
                if (infosId.includes(parseInt(item.id))) {
                    return ServicesInfosModel.update({ description: item.description }, { where: { id: item.id } });
                }
                else {
                    return ServicesInfosModel.create({
                        description: item.description,
                        serviceId: serviceId,
                    });
                }
            }));
        }
        const serviceWithInfos = await ServiceModel.findOne({
            where: { id: serviceId },
            include: [{ model: ServicesInfosModel, as: 'infos', order: [['id', 'DESC']] }],
        });
        return serviceWithInfos;
    }
    async deleteService(serviceId, next) {
        const service = await ServiceModel.findOne({ where: { $id$: serviceId } });
        if (service)
            if ((service === null || service === void 0 ? void 0 : service.image) != SERVICE_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'services', service === null || service === void 0 ? void 0 : service.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`services/${service === null || service === void 0 ? void 0 : service.image}.jpg was deleted`);
                });
            }
        await ServicesInfosModel.destroy({ where: { $serviceId$: serviceId } });
        await ServiceModel.destroy({ where: { $id$: serviceId } });
        return service;
    }
}
export default new ServiceModelService();
//# sourceMappingURL=ServiceModelService.js.map