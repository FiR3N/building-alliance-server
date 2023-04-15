import { ConstructionWorks, ConstructionWorksInfos } from '../models/models.js';
import { CONSTRUCTION_WORK_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class ConstructionWorkService {
  async addConstructionWork(
    name: string,
    description: string,
    img: UploadedFile,
    price: number,
    value: string,
    info: string,
  ) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      await img.mv(path.resolve(__dirname, 'static', 'construction-works', imgPathname));
    } else {
      imgPathname = CONSTRUCTION_WORK_PLUG_IMG;
    }
    const constructionWork = await ConstructionWorks.create({
      name,
      description,
      img: imgPathname,
      price: price,
      value,
    });

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          return ConstructionWorksInfos.create({
            description: item.description,
            constructionWorkId: constructionWork.id,
          });
        }),
      );
    }

    const constructionWorkWithInfos = await ConstructionWorks.findOne({
      where: { id: constructionWork.id },
      include: [{ model: ConstructionWorksInfos, as: 'infos' }],
    });

    return constructionWorkWithInfos;
  }

  async putConstructionWork(
    constructionWorkId: number,
    name: string,
    description: string,
    img: UploadedFile,
    price: number,
    value: string,
    info: string,
  ) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static', 'construction-works', imgPathname));
    } else {
      imgPathname = CONSTRUCTION_WORK_PLUG_IMG;
    }

    await ConstructionWorks.update(
      {
        name,
        description,
        img: imgPathname,
        price,
        value,
      },
      { where: { $id$: constructionWorkId } },
    );

    const infos = await ConstructionWorksInfos.findAll({ where: { constructionWorkId: constructionWorkId } });

    const infosId = infos.map((item) => item.id);

    if (info) {
      let jsonInfo: any[] = JSON.parse(info);
      await Promise.all(
        jsonInfo.map((item) => {
          if (infosId.includes(parseInt(item.id))) {
            return ConstructionWorksInfos.update({ description: item.description }, { where: { id: item.id } });
          } else {
            return ConstructionWorksInfos.create({
              description: item.description,
              constructionWorkId: constructionWorkId,
            });
          }
        }),
      );
    }

    const ConstructionWorksWithInfos = await ConstructionWorks.findOne({
      where: { id: constructionWorkId },
      include: [{ model: ConstructionWorksInfos, as: 'infos', order: [['id', 'DESC']] }],
    });

    return ConstructionWorksWithInfos;
  }

  async deleteConstructionWork(constructionWorkId: number, next: NextFunction) {
    const constructionWork = await ConstructionWorks.findOne({ where: { $id$: constructionWorkId } });
    if (constructionWork)
      if (constructionWork?.img != CONSTRUCTION_WORK_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'construction-work', constructionWork?.img!), (err: any) => {
          if (err) next(err);
          console.log(`construction-work/${constructionWork?.img}.jpg was deleted`);
        });
      }
    await ConstructionWorksInfos.destroy({ where: { $constructionWorkId$: constructionWorkId } });

    await ConstructionWorks.destroy({ where: { $id$: constructionWorkId } });

    return constructionWork;
  }
}

export default new ConstructionWorkService();
