import Router from 'express';
import CertificateController from '../controllers/CertificateController.js';

const certificateRouter = Router();
certificateRouter.get('/', CertificateController.getCertificates);
certificateRouter.post('/', CertificateController.addCertificate);
certificateRouter.delete('/:certificateId', CertificateController.deleteCertificate);
certificateRouter.put('/:certificateId', CertificateController.putCertificate);

export default certificateRouter;
