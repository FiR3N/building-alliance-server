import Router from 'express';
import ContactController from '../controllers/ContactController.js';

const contactRouter = Router();

contactRouter.post('/', ContactController.sendMessageFromUser);
contactRouter.post('/vacancy', ContactController.sendVacancyMessageFromUser);

export default contactRouter;
