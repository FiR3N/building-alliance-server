import Router from 'express';
import CertificateController from '../controllers/CertificateController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const certificateRouter = Router();
certificateRouter.get('/', CertificateController.getCertificates);
certificateRouter.post('/', authMiddleware, CertificateController.addCertificate);
certificateRouter.delete('/:certificateId', authMiddleware, CertificateController.deleteCertificate);
certificateRouter.put('/:certificateId', authMiddleware, CertificateController.putCertificate);
export default certificateRouter;
//# sourceMappingURL=certificateRouter.js.map