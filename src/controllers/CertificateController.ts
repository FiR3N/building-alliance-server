import { NextFunction, Request, Response } from 'express';
import { CertificatesModel } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import CertificatesService from '../services/CertificatesService.js';

class CertificateController {
  async addCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const { description } = req.body;
      let image = req.files?.image as UploadedFile;

      const certificate = await CertificatesService.addCertificate(description, image);

      return res.status(200).json(certificate);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const certificateId = Number(req.params.certificateId);
      const { description } = req.body;
      let image = req.files?.img as UploadedFile;

      const certificate = await CertificatesService.putCertificate(certificateId, description, image);

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
      const certificates = await CertificatesModel.findAll({});
      return res.status(200).json(certificates);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new CertificateController();
