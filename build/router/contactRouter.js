import Router from 'express';
import ContactController from '../controllers/ContactController.js';
const contactRouter = Router();
contactRouter.post('/', ContactController.sendMessageFromUser);
export default contactRouter;
//# sourceMappingURL=contactRouter.js.map