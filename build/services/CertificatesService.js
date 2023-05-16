import { CertificatesModel } from '../models/models.js';
import { CERTIFICATE_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { v4 } from 'uuid';
import fs from 'fs';
class CertificatesService {
    async addCertificate(description, img) {
        let imgPathname;
        if (img) {
            imgPathname = v4() + '.webp';
            await img.mv(path.resolve(__dirname, 'static', 'certificates', imgPathname));
        }
        else {
            imgPathname = CERTIFICATE_PLUG_IMG;
        }
        const certificate = await CertificatesModel.create({
            description,
            image: imgPathname,
        });
        return certificate;
    }
    async putCertificate(certificateId, description, image, next) {
        const certificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });
        let imgPathname = certificate === null || certificate === void 0 ? void 0 : certificate.image;
        if (image) {
            imgPathname = v4() + '.jpg';
            image.mv(path.resolve(__dirname, 'static', 'certificates', imgPathname));
            if ((certificate === null || certificate === void 0 ? void 0 : certificate.image) != CERTIFICATE_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'certificates', certificate === null || certificate === void 0 ? void 0 : certificate.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`certificate/${certificate === null || certificate === void 0 ? void 0 : certificate.image}.jpg was deleted`);
                });
            }
        }
        await CertificatesModel.update({
            description,
            image: imgPathname,
        }, { where: { $id$: certificateId } });
        const updatedCertificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });
        return updatedCertificate;
    }
    async deleteCertificate(certificateId, next) {
        const certificate = await CertificatesModel.findOne({ where: { $id$: certificateId } });
        if (certificate)
            if ((certificate === null || certificate === void 0 ? void 0 : certificate.image) != CERTIFICATE_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'news', certificate === null || certificate === void 0 ? void 0 : certificate.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`certificates/${certificate === null || certificate === void 0 ? void 0 : certificate.image}.webp was deleted`);
                });
            }
        await CertificatesModel.destroy({ where: { $id$: certificateId } });
        return certificate;
    }
}
export default new CertificatesService();
//# sourceMappingURL=CertificatesService.js.map