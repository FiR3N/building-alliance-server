import { CertificatesModel } from '../models/models.js';
import ApiError from '../exceptions/ApiError.js';
import CertificatesService from '../services/CertificatesService.js';
class CertificateController {
    async addCertificate(req, res, next) {
        var _a;
        try {
            const { description } = req.body;
            let image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const certificate = await CertificatesService.addCertificate(description, image);
            return res.status(200).json(certificate);
        }
        catch (e) {
            console.log(e.message);
            next(e);
        }
    }
    async putCertificate(req, res, next) {
        var _a;
        try {
            const certificateId = Number(req.params.certificateId);
            const { description } = req.body;
            let image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
            const certificate = await CertificatesService.putCertificate(certificateId, description, image, next);
            return res.status(200).json(certificate);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteCertificate(req, res, next) {
        try {
            const certificateId = Number(req.params.certificateId);
            const certificate = await CertificatesService.deleteCertificate(certificateId, next);
            if (!certificate) {
                return next(ApiError.BadRequest('Сертификат с таким Id не найден', []));
            }
            return res.status(200).json(certificate);
        }
        catch (e) {
            next(e);
        }
    }
    async getCertificates(req, res, next) {
        try {
            const certificates = await CertificatesModel.findAll({ order: [['id', 'ASC']] });
            return res.status(200).json(certificates);
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
}
export default new CertificateController();
//# sourceMappingURL=CertificateController.js.map