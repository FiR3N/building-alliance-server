import nodemailer from 'nodemailer';
class MailService {
    constructor() {
        this.trasporter = nodemailer.createTransport({
            host: process.env.SMPTP_HOST,
            port: process.env.SMPTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMPTP_USER,
                pass: process.env.SMPTP_PASSWORD,
            },
        });
    }
    async sendEmailFromUser(name, surname, email, text, subject, companyName, telephone) {
        await this.trasporter.sendMail({
            from: email,
            to: process.env.SMPTP_USER,
            subject: `Тема: ${subject}`,
            text: text,
            html: `<div style="margin-bottom: 20px; font-weight: bold;">From ${email}</div>
      <div style="margin-bottom: 10px; font-weight: bold;">UserName: ${name}</div>
      <div style="margin-bottom: 10px; font-weight: bold;"> UserSurname: ${surname}</div>
      <div style="margin-bottom: 10px; font-weight: bold;">CompanyName: ${companyName}</div>
      <div style="margin-bottom: 20px; font-weight: bold;">Telephone: ${telephone}</div>
 
      <div>${text}</div>
      `,
        });
    }
    async sendVacancyEmailFromUser(name, surname, patronymic, email, telephone, text, vacancyName) {
        await this.trasporter.sendMail({
            from: process.env.SMPTP_USER,
            to: process.env.SMPTP_USER,
            subject: `Заявка на вакансию: ${vacancyName}`,
            text: text,
            html: `<div style="margin-bottom: 10px; font-weight: bold;">Почта пользователя: <span style="font-weight: 500">${email}</span></div>
      <div style="margin-bottom: 10px; font-weight: bold;">ФИО пользователя: <span style="font-weight: 500">${surname} ${name} ${patronymic} </span></div>
      <div style="margin-bottom: 10px; font-weight: bold;">Телефон пользователя: <span style="font-weight: 500">${telephone}</span></div>
      <div style="margin-bottom: 10px; font-weight: bold;">Дополнительный текст: <span style="font-weight: 500">${text}</span></div>`,
        });
    }
}
export default new MailService();
//# sourceMappingURL=MailService.js.map