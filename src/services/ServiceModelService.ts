import { ServiceModel, ServicesInfosModel } from '../models/models.js';
import { SERVICE_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class ServiceModelService {
  async addService(name: string, img: UploadedFile, info: string) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      await img.mv(path.resolve(__dirname, 'static', 'services', imgPathname));
    } else {
      imgPathname = SERVICE_PLUG_IMG;
    }

    const service = await ServiceModel.create({
      name,
      image: imgPathname,
    });

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          return ServicesInfosModel.create({
            description: item.description,
            serviceId: service.id,
          });
        }),
      );
    }

    const serviceWithInfos = await ServiceModel.findOne({
      where: { id: service.id },
      include: [{ model: ServicesInfosModel, as: 'infos' }],
    });

    return serviceWithInfos;
  }

  async putService(serviceId: number, name: string, image: UploadedFile, info: string, next: NextFunction) {
    const service = await ServiceModel.findOne({ where: { $id$: serviceId } });

    let imgPathname = service?.image;

    if (image) {
      imgPathname = v4() + '.jpg';
      image.mv(path.resolve(__dirname, 'static', 'services', imgPathname));

      if (service?.image != SERVICE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'services', service?.image!), (err: any) => {
          if (err) next(err);
          console.log(`service/${service?.image}.jpg was deleted`);
        });
      }
    }

    await ServiceModel.update(
      {
        name,
        image: imgPathname,
      },
      { where: { $id$: serviceId } },
    );

    const infos = await ServicesInfosModel.findAll({ where: { $serviceId$: serviceId } });

    const infosId = infos.map((item) => item.id);

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          if (infosId.includes(parseInt(item.id))) {
            return ServicesInfosModel.update({ description: item.description }, { where: { id: item.id } });
          } else {
            return ServicesInfosModel.create({
              description: item.description,
              serviceId: serviceId,
            });
          }
        }),
      );

      const jsonInfoIds = jsonInfo.map((item) => item.id);
      //удаление
      await Promise.all(
        infosId.map((id) => {
          if (!jsonInfoIds.includes(id)) {
            return ServicesInfosModel.destroy({ where: { $id$: id } });
          }
        }),
      );
    }

    const serviceWithInfos = await ServiceModel.findOne({
      where: { id: serviceId },
      include: [{ model: ServicesInfosModel, as: 'infos', order: [['id', 'DESC']] }],
    });

    return serviceWithInfos;
  }

  async deleteService(serviceId: number, next: NextFunction) {
    const service = await ServiceModel.findOne({ where: { $id$: serviceId } });
    if (service)
      if (service?.image != SERVICE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'services', service?.image!), (err: any) => {
          if (err) next(err);
          console.log(`services/${service?.image}.jpg was deleted`);
        });
      }
    await ServicesInfosModel.destroy({ where: { $serviceId$: serviceId } });

    await ServiceModel.destroy({ where: { $id$: serviceId } });
    return service;
  }

  async getServices(limit: number, page: number) {
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

    return services;
  }

  async getServiceById(serviceId: number) {
    const service = await ServiceModel.findOne({
      where: { id: serviceId },
      include: [{ model: ServicesInfosModel, as: 'infos' }],
      order: [
        ['id', 'ASC'],
        [{ model: ServicesInfosModel, as: 'infos' }, 'id'],
      ],
    });

    return service;
  }
}

export default new ServiceModelService();
