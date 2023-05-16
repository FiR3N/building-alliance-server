import MailService from '../services/MailService.js';
class ContactController {
    async sendMessageFromUser(req, res, next) {
        try {
            const { name, surname, subject, text, companyName, telephone, email } = req.body;
            await MailService.sendEmailFromUser(name, surname, email, text, subject, companyName, telephone);
            return res.status(200).json('Сообщение отправлено');
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
    async sendVacancyMessageFromUser(req, res, next) {
        try {
            const { name, surname, patronymic, text, telephone, email, vacancyName } = req.body;
            await MailService.sendVacancyEmailFromUser(name, surname, patronymic, email, telephone, text, vacancyName);
            return res.status(200).json('Сообщение отправлено');
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
}
export default new ContactController();
//# sourceMappingURL=ContactController.js.map