import { WorkModel, WorkImagesModel, WorkInfosModel } from '../models/models.js';
import { WORK_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { v4 } from 'uuid';
import fs from 'fs';
class WorkService {
    async addWork(name, img, date, info, images) {
        let imgPathname;
        if (img) {
            imgPathname = v4() + '.jpg';
            await img.mv(path.resolve(__dirname, 'static', 'works', imgPathname));
        }
        else {
            imgPathname = WORK_PLUG_IMG;
        }
        const newDate = new Date(Date.parse(date));
        const work = await WorkModel.create({
            name,
            image: imgPathname,
            date: newDate,
        });
        if (info) {
            let jsonInfo = JSON.parse(info);
            await Promise.all(jsonInfo.map((item) => {
                return WorkInfosModel.create({
                    description: item.description,
                    workId: work.id,
                });
            }));
        }
        if (images) {
            const promises = images.map(async (image) => {
                let imageName = v4() + '.jpg';
                await image.mv(path.resolve(__dirname, 'static', 'works', imageName));
                await WorkImagesModel.create({ image: imageName, workId: work.id });
            });
            await Promise.all(promises);
        }
        const workWithInfosAndImages = await WorkModel.findOne({
            where: { id: work.id },
            include: [
                { model: WorkInfosModel, as: 'infos' },
                { model: WorkImagesModel, as: 'images' },
            ],
            order: [
                [{ model: WorkInfosModel, as: 'infos' }, 'id'],
                [{ model: WorkImagesModel, as: 'images' }, 'id'],
            ],
        });
        return workWithInfosAndImages;
    }
    async putWork(workId, name, image, date, info, next, imageInfo, imageList) {
        const work = await WorkModel.findOne({ where: { $id$: workId } });
        let imgPathname = work === null || work === void 0 ? void 0 : work.image;
        if (image) {
            imgPathname = v4() + '.jpg';
            image.mv(path.resolve(__dirname, 'static', 'works', imgPathname));
            if ((work === null || work === void 0 ? void 0 : work.image) != WORK_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'works', work === null || work === void 0 ? void 0 : work.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`works/${work === null || work === void 0 ? void 0 : work.image}.jpg was deleted`);
                });
            }
        }
        const newDate = new Date(Date.parse(date));
        await WorkModel.update({
            name,
            image: imgPathname,
            date: newDate,
        }, { where: { $id$: workId } });
        const infos = await WorkInfosModel.findAll({ where: { $workId$: workId } });
        const imagesInfo = await WorkImagesModel.findAll({ where: { $workId$: workId } });
        const infosId = infos.map((item) => item.id);
        const imagesInfoId = imagesInfo === null || imagesInfo === void 0 ? void 0 : imagesInfo.map((item) => item.id);
        if (info) {
            let jsonInfo = JSON.parse(info);
            await Promise.all(jsonInfo.map((item) => {
                if (infosId.includes(parseInt(item.id))) {
                    return WorkInfosModel.update({ description: item.description }, { where: { id: item.id } });
                }
                else {
                    return WorkInfosModel.create({
                        description: item.description,
                        workId: workId,
                    });
                }
            }));
            const jsonInfoIds = jsonInfo.map((item) => item.id);
            await Promise.all(infosId.map((id) => {
                if (!jsonInfoIds.includes(id)) {
                    return WorkInfosModel.destroy({ where: { $id$: id } });
                }
            }));
        }
        if (imageInfo) {
            let jsonImageInfo = JSON.parse(imageInfo);
            const jsonInfoIds = jsonImageInfo.map((item) => item.id);
            await Promise.all(imagesInfoId.map((id) => {
                if (!jsonInfoIds.includes(id)) {
                    const deleteItem = imagesInfo.find((item) => item.id === id);
                    fs.unlink(path.resolve(__dirname, 'static', 'works', deleteItem === null || deleteItem === void 0 ? void 0 : deleteItem.image), (err) => {
                        if (err)
                            next(err);
                        console.log(`works/${deleteItem === null || deleteItem === void 0 ? void 0 : deleteItem.image}.jpg was deleted`);
                    });
                    return WorkImagesModel.destroy({ where: { $id$: id } });
                }
            }));
        }
        if (imageList) {
            const promises = imageList.map(async (image) => {
                let imageName = v4() + '.jpg';
                await image.mv(path.resolve(__dirname, 'static', 'works', imageName));
                await WorkImagesModel.create({ image: imageName, workId: workId });
            });
            await Promise.all(promises);
        }
        const workWithInfosAndImages = await WorkModel.findOne({
            where: { id: workId },
            include: [
                { model: WorkInfosModel, as: 'infos' },
                { model: WorkImagesModel, as: 'images' },
            ],
            order: [
                ['date', 'ASC'],
                [{ model: WorkInfosModel, as: 'infos' }, 'id'],
                [{ model: WorkImagesModel, as: 'images' }, 'id'],
            ],
        });
        return workWithInfosAndImages;
    }
    async deleteWork(workId, next) {
        const work = await WorkModel.findOne({ where: { $id$: workId } });
        const workImages = await WorkImagesModel.findAll({ where: { $workId$: workId } });
        if (work)
            if ((work === null || work === void 0 ? void 0 : work.image) != WORK_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'works', work === null || work === void 0 ? void 0 : work.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`works/${work === null || work === void 0 ? void 0 : work.image}.jpg was deleted`);
                });
            }
        if (workImages) {
            workImages.map((workImage) => {
                if (workImage.image != WORK_PLUG_IMG) {
                    fs.unlink(path.resolve(__dirname, 'static', 'works', workImage === null || workImage === void 0 ? void 0 : workImage.image), (err) => {
                        if (err)
                            next(err);
                        console.log(`works/${workImage === null || workImage === void 0 ? void 0 : workImage.image}.jpg was deleted`);
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
//# sourceMappingURL=WorkService.js.map