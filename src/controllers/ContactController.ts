import { NextFunction, Request, Response } from 'express';
import MailService from '../services/MailService.js';

class ContactController {
  async sendMessageFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, surname, subject, text, companyName, telephone, email } = req.body;
      await MailService.sendEmailFromUser(name, surname, email, text, subject, companyName, telephone);
      return res.status(200).json('Сообщение отправлено');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async sendVacancyMessageFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, surname, patronymic, text, telephone, email, vacancyName } = req.body;
      await MailService.sendVacancyEmailFromUser(name, surname, patronymic, email, telephone, text, vacancyName);
      return res.status(200).json('Сообщение отправлено');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async sendMixtureOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, address, email, count, price, mixtureType, mixture, text } = req.body;
      await MailService.sendMixtureOrder(name, phone, address, email, count, price, mixtureType, mixture, text);
      return res.status(200).json('Сообщение отправлено');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async sendVehicleOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, address, email, hoursCount, price, vehicle, date, text } = req.body;
      await MailService.sendVehicleOrder(name, phone, address, email, hoursCount, price, vehicle, date, text);
      return res.status(200).json('Сообщение отправлено');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new ContactController();
