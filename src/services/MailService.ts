import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

class MailService {
  trasporter: Transporter;
  constructor() {
    this.trasporter = nodemailer.createTransport({
      host: process.env.SMPTP_HOST,
      port: process.env.SMPTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMPTP_USER,
        pass: process.env.SMPTP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendEmailFromUser(
    name: string,
    surname: string,
    email: string,
    text: string,
    subject: string,
    companyName: string,
    telephone: string,
  ) {
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

  async sendVacancyEmailFromUser(
    name: string,
    surname: string,
    patronymic: string,
    email: string,
    telephone: string,
    text: string,
    vacancyName: string,
  ) {
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
