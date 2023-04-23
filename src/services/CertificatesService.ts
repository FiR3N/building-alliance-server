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

  async putCertificate(certificateId: number, description: string, img: UploadedFile) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static', 'certificates', imgPathname));
    } else {
      imgPathname = CERTIFICATE_PLUG_IMG;
    }

    const certificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });

    await CertificatesModel.update(
      {
        description,
        image: imgPathname,
      },
      { where: { $id$: certificateId } },
    );

    return certificate;
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
