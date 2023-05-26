import { CertificatesImagesModel, CertificatesModel } from '../models/models.js';
import { CERTIFICATE_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class CertificatesService {
  async addCertificate(description: string, img: UploadedFile, images: UploadedFile[]) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.webp';
      await img.mv(path.resolve(__dirname, 'static', 'certificates', imgPathname));
    } else {
      imgPathname = CERTIFICATE_PLUG_IMG;
    }

    const certificate = await CertificatesModel.create({
      description,
      image: imgPathname,
    });

    if (images) {
      const promises = images.map(async (image: UploadedFile) => {
        let imageName = v4() + '.webp';
        await image.mv(path.resolve(__dirname, 'static', 'certificates', imageName));
        await CertificatesImagesModel.create({ image: imageName, certificateId: certificate.id });
      });
      await Promise.all(promises);
    }

    const certficatesWithImages = await CertificatesModel.findOne({
      where: { id: certificate.id },
      include: [{ model: CertificatesImagesModel, as: 'images' }],
      order: [[{ model: CertificatesImagesModel, as: 'images' }, 'id']],
    });

    return certficatesWithImages;
  }

  async putCertificate(
    certificateId: number,
    description: string,
    image: UploadedFile,
    next: NextFunction,
    imageInfo: string,
    imageList?: UploadedFile[],
  ) {
    const certificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });

    let imgPathname = certificate?.image;

    if (image) {
      imgPathname = v4() + '.webp';
      image.mv(path.resolve(__dirname, 'static', 'certificates', imgPathname));

      if (certificate?.image != CERTIFICATE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'certificates', certificate?.image!), (err: any) => {
          if (err) next(err);
          console.log(`certificate/${certificate?.image}.webp was deleted`);
        });
      }
    }

    await CertificatesModel.update(
      {
        description,
        image: imgPathname,
      },
      { where: { $id$: certificateId } },
    );

    const imagesInfo = await CertificatesImagesModel.findAll({ where: { $certificateId$: certificateId } });
    const imagesInfoId = imagesInfo?.map((item) => item.id);

    if (imageInfo) {
      let jsonImageInfo: any[] = JSON.parse(imageInfo);
      const jsonInfoIds = jsonImageInfo.map((item) => item.id);
      //удаление
      await Promise.all(
        imagesInfoId.map((id) => {
          if (!jsonInfoIds.includes(id)) {
            const deleteItem = imagesInfo.find((item) => item.id === id);
            fs.unlink(path.resolve(__dirname, 'static', 'certificates', deleteItem?.image!), (err: any) => {
              if (err) next(err);
              console.log(`certificates/${deleteItem?.image}.webp was deleted`);
            });
            return CertificatesImagesModel.destroy({ where: { $id$: id } });
          }
        }),
      );
    }
    if (imageList) {
      const promises = imageList.map(async (image: UploadedFile) => {
        let imageName = v4() + '.webp';
        await image.mv(path.resolve(__dirname, 'static', 'certificates', imageName));
        await CertificatesImagesModel.create({ image: imageName, certificateId: certificateId });
      });
      await Promise.all(promises);
    }

    const certficatesWithImages = await CertificatesModel.findOne({
      where: { id: certificateId },
      include: [{ model: CertificatesImagesModel, as: 'images' }],
      order: [[{ model: CertificatesImagesModel, as: 'images' }, 'id']],
    });

    return certficatesWithImages;
  }

  async deleteCertificate(certificateId: number, next: NextFunction) {
    const certificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });
    const certificateImages = await CertificatesImagesModel.findAll({ where: { $certificateId$: certificateId } });

    if (certificate)
      if (certificate?.image != CERTIFICATE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'certificates', certificate?.image!), (err: any) => {
          if (err) next(err);
          console.log(`certificates/${certificate?.image}.webp was deleted`);
        });
      }

    if (certificateImages) {
      certificateImages.map((certificateImage) => {
        if (certificateImage.image != CERTIFICATE_PLUG_IMG) {
          fs.unlink(path.resolve(__dirname, 'static', 'certificates', certificateImage?.image!), (err: any) => {
            if (err) next(err);
            console.log(`certificates/${certificateImage?.image}.webp was deleted`);
          });
        }
      });
    }
    await CertificatesImagesModel.destroy({ where: { $certificateId$: certificateId } });
    await CertificatesModel.destroy({ where: { $id$: certificateId } });

    return certificate;
  }
}

export default new CertificatesService();
