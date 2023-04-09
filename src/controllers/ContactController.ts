import { NextFunction, Request, Response } from 'express';
import MailService from '../services/MailService.js';

class ContactController {
  async sendMessageFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, surname, subject, text, companyName, telephone, email } = req.body;
      await MailService.sendEmalFromUser(name, surname, email, text, subject, companyName, telephone);
      return res.status(200).json('Сообщение отправлено');
    } catch (e) {
      next(e);
    }
  }
}

export default new ContactController();
