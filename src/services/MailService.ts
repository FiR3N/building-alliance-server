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

  async sendEmalFromUser(
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
}

export default new MailService();
