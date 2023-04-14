import { Vehicles, VehiclesInfos } from '../models/models.js';
import { VEHICLE_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class VehicleService {
  async addVehicle(
    name: string,
    description: string,
    img: UploadedFile,
    count: number,
    pricePerHour: number,
    yearProduction: Date,
    info: string,
  ) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      await img.mv(path.resolve(__dirname, 'static', 'vehicles', imgPathname));
    } else {
      imgPathname = VEHICLE_PLUG_IMG;
    }
    const vehicle = await Vehicles.create({
      name,
      description,
      img: imgPathname,
      count,
      price_per_hour: pricePerHour,
      year_production: yearProduction,
    });

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          return VehiclesInfos.create({
            description: item.description,
            vehicleId: vehicle.id,
          });
        }),
      );
    }

    const vehicleWithInfos = await Vehicles.findOne({
      where: { id: vehicle.id },
      include: [{ model: VehiclesInfos, as: 'infos' }],
    });

    return vehicleWithInfos;
  }

  async putVehicle(
    vehicleId: number,
    name: string,
    description: string,
    img: UploadedFile,
    count: number,
    pricePerHour: number,
    yearProduction: Date,
    info: string,
  ) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static', 'vehicles', imgPathname));
    } else {
      imgPathname = VEHICLE_PLUG_IMG;
    }

    await Vehicles.update(
      {
        name,
        description,
        img: imgPathname,
        count,
        price_per_hour: pricePerHour,
        year_production: yearProduction,
      },
      { where: { $id$: vehicleId } },
    );

    const infos = await VehiclesInfos.findAll({ where: { vehicleId: vehicleId } });

    const infosId = infos.map((item) => item.id);

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          if (infosId.includes(parseInt(item.id))) {
            return VehiclesInfos.update({ description: item.description }, { where: { id: item.id } });
          } else {
            return VehiclesInfos.create({
              description: item.description,
              vehicleId: vehicleId,
            });
          }
        }),
      );
    }

    const vehicleWithInfos = await Vehicles.findOne({
      where: { id: vehicleId },
      include: [{ model: VehiclesInfos, as: 'infos', order: [['id', 'DESC']] }],
    });

    return vehicleWithInfos;
  }

  async deleteVehicle(vehicleId: number, next: NextFunction) {
    const vehicle = await Vehicles.findOne({ where: { $id$: vehicleId } });
    if (vehicle)
      if (vehicle?.img != VEHICLE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'vehicles', vehicle?.img!), (err: any) => {
          if (err) next(err);
          console.log(`vehicles/${vehicle?.img}.jpg was deleted`);
        });
      }
    await VehiclesInfos.destroy({ where: { $vehicleId$: vehicleId } });

    await Vehicles.destroy({ where: { $id$: vehicleId } });

    return vehicle;
  }
}

export default new VehicleService();
