import { NextFunction, Request, Response } from 'express';
import { CertificatesImagesModel, CertificatesModel } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import CertificatesService from '../services/CertificatesService.js';

class CertificateController {
  async addCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const { description } = req.body;
      let image = req.files?.image as UploadedFile;

      const uploadedFiles = req.files;
      const imageList = [] as UploadedFile[];

      for (const key in uploadedFiles) {
        if (key.startsWith('imageList[')) {
          imageList.push(uploadedFiles[key] as UploadedFile);
        }
      }

      const certificate = await CertificatesService.addCertificate(description, image, imageList);

      return res.status(200).json(certificate);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const certificateId = Number(req.params.certificateId);
      const { description, imageInfo } = req.body;
      let image = req.files?.image as UploadedFile;
      const uploadedFiles = req.files;

      const imageList = [] as UploadedFile[];

      for (const key in uploadedFiles) {
        if (key.startsWith('imageList[')) {
          imageList.push(uploadedFiles[key] as UploadedFile);
        }
      }

      const certificate = await CertificatesService.putCertificate(
        certificateId,
        description,
        image,
        next,
        imageInfo,
        imageList,
      );

      return res.status(200).json(certificate);
    } catch (e) {
      next(e);
    }
  }
  async deleteCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const certificateId = Number(req.params.certificateId);

      const certificate = await CertificatesService.deleteCertificate(certificateId, next);

      if (!certificate) {
        return next(ApiError.BadRequest('Сертификат с таким Id не найден', []));
      }

      return res.status(200).json(certificate);
    } catch (e) {
      next(e);
    }
  }
  async getCertificates(req: Request, res: Response, next: NextFunction) {
    try {
      const certificates = await CertificatesModel.findAll({
        include: [{ model: CertificatesImagesModel, as: 'images' }],
        order: [
          ['id', 'ASC'],
          [{ model: CertificatesImagesModel, as: 'images' }, 'id'],
        ],
      });
      return res.status(200).json(certificates);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new CertificateController();
