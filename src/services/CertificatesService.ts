import { CertificatesModel } from '../models/models.js';
import { CERTIFICATE_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';

class CertificatesService {
  async addCertificate(description: string, img: UploadedFile) {
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

    return certificate;
  }

  async putCertificate(certificateId: number, description: string, image: UploadedFile, next: NextFunction) {
    const certificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });

    let imgPathname = certificate?.image;

    if (image) {
      imgPathname = v4() + '.jpg';
      image.mv(path.resolve(__dirname, 'static', 'certificates', imgPathname));

      if (certificate?.image != CERTIFICATE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'certificates', certificate?.image!), (err: any) => {
          if (err) next(err);
          console.log(`certificate/${certificate?.image}.jpg was deleted`);
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

    const updatedCertificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });

    return updatedCertificate;
  }

  async deleteCertificate(certificateId: number, next: NextFunction) {
    const certificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });
    if (certificate)
      if (certificate?.image != CERTIFICATE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'news', certificate?.image!), (err: any) => {
          if (err) next(err);
          console.log(`certificates/${certificate?.image}.webp was deleted`);
        });
      }

    await CertificatesModel.destroy({ where: { $id$: certificateId } });
    return certificate;
  }
}

export default new CertificatesService();
