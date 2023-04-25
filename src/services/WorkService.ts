import { WorkModel, WorkImagesModel, WorkInfosModel } from '../models/models.js';
import { WORK_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class WorkService {
  async addWork(name: string, img: UploadedFile, date: string, info: string, images: UploadedFile[]) {
    let imgPathname: string;
    if (img) {
      imgPathname = v4() + '.jpg';
      await img.mv(path.resolve(__dirname, 'static', 'works', imgPathname));
    } else {
      imgPathname = WORK_PLUG_IMG;
    }
    const newDate = new Date(Date.parse(date));

    const work = await WorkModel.create({
      name,
      image: imgPathname,
      date: newDate,
    });
    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          return WorkInfosModel.create({
            description: item.description,
            workId: work.id,
          });
        }),
      );
    }
    if (images) {
      const promises = images.map(async (image: UploadedFile) => {
        let imageName = v4() + '.jpg';
        await image.mv(path.resolve(__dirname, 'static', 'works', imageName));
        await WorkImagesModel.create({ image: imageName, workId: work.id });
      });
      await Promise.all(promises);
    }

    const workWithInfosAndImages = await WorkModel.findOne({
      where: { id: work.id },
      include: [
        { model: WorkInfosModel, as: 'infos', order: [['id', 'ASC']] },
        { model: WorkImagesModel, as: 'images', order: [['id', 'ASC']] },
      ],
    });
    return workWithInfosAndImages;
  }
  async putWork(
    workId: number,
    name: string,
    img: UploadedFile,
    date: string,
    info: string,
    next: NextFunction,
    images?: UploadedFile[],
  ) {
    let imgPathname: string;
    if (img) {
      imgPathname = v4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static', 'works', imgPathname));
    } else {
      imgPathname = WORK_PLUG_IMG;
    }

    const newDate = new Date(Date.parse(date));
    await WorkModel.update(
      {
        name,
        image: imgPathname,
        date: newDate,
      },
      { where: { $id$: workId } },
    );

    const infos = await WorkInfosModel.findAll({ where: { $workId$: workId } });
    const infosId = infos.map((item) => item.id);

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          if (infosId.includes(parseInt(item.id))) {
            return WorkInfosModel.update({ description: item.description }, { where: { id: item.id } });
          } else {
            return WorkInfosModel.create({
              description: item.description,
              workId: workId,
            });
          }
        }),
      );
    }

    if (images) {
      const imageList = await WorkImagesModel.findAll({ where: { $workId$: workId } });
      imageList.map((workImage) => {
        if (workImage.image != WORK_PLUG_IMG) {
          fs.unlink(path.resolve(__dirname, 'static', 'works', workImage?.image!), (err: any) => {
            if (err) next(err);
            console.log(`works/${workImage?.image}.jpg was deleted`);
          });
        }
      });

      await WorkImagesModel.destroy({ where: { $workId$: workId } });

      const promises = images.map(async (image: UploadedFile) => {
        let imageName = v4() + '.jpg';
        await image.mv(path.resolve(__dirname, 'static', 'works', imageName));
        await WorkImagesModel.create({ image: imageName, workId: workId });
      });
      await Promise.all(promises);
    }

    const workWithInfosAndImages = await WorkModel.findOne({
      where: { id: workId },
      include: [
        { model: WorkInfosModel, as: 'infos', order: [['id', 'ASC']] },
        { model: WorkImagesModel, as: 'images', order: [['id', 'ASC']] },
      ],
    });
    return workWithInfosAndImages;
  }
  async deleteWork(workId: number, next: NextFunction) {
    const work = await WorkModel.findOne({ where: { $id$: workId } });
    const workImages = await WorkImagesModel.findAll({ where: { $workId$: workId } });

    if (work)
      if (work?.image != WORK_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'works', work?.image!), (err: any) => {
          if (err) next(err);
          console.log(`works/${work?.image}.jpg was deleted`);
        });
      }

    if (workImages) {
      workImages.map((workImage) => {
        if (workImage.image != WORK_PLUG_IMG) {
          fs.unlink(path.resolve(__dirname, 'static', 'works', workImage?.image!), (err: any) => {
            if (err) next(err);
            console.log(`works/${workImage?.image}.jpg was deleted`);
          });
        }
      });
    }
    await WorkInfosModel.destroy({ where: { $workId$: workId } });
    await WorkImagesModel.destroy({ where: { $workId$: workId } });
    await WorkModel.destroy({ where: { $id$: workId } });

    return work;
  }
}

export default new WorkService();
