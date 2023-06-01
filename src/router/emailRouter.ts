import Router from 'express';
import ContactController from '../controllers/ContactController.js';

const emailRouter = Router();

emailRouter.post('/contact', ContactController.sendMessageFromUser);
emailRouter.post('/vacancy', ContactController.sendVacancyMessageFromUser);
emailRouter.post('/mixture-order', ContactController.sendMixtureOrder);
emailRouter.post('/vehicle-order', ContactController.sendVehicleOrder);

export default emailRouter;
