import Router from 'express';
import CertificateController from '../controllers/CertificateController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const certificateRouter = Router();
certificateRouter.get('/', CertificateController.getCertificates);
certificateRouter.post('/', authMiddleware, checkRoleMiddleware([1, 2]), CertificateController.addCertificate);
certificateRouter.delete('/:certificateId', authMiddleware, checkRoleMiddleware([1, 2]), CertificateController.deleteCertificate);
certificateRouter.put('/:certificateId', authMiddleware, checkRoleMiddleware([1, 2]), CertificateController.putCertificate);
export default certificateRouter;
//# sourceMappingURL=certificateRouter.js.map