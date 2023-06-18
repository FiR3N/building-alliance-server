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
      text: '',
      html: `<div style="margin-bottom: 20px; font-weight: bold;">Почта пользователя: <span style="font-weight: 500">${email}<span/></div>
      <div style="margin-bottom: 10px; font-weight: bold;">Имя пользователя: <span style="font-weight: 500">${name}<span/></div>
      <div style="margin-bottom: 10px; font-weight: bold;">Фамилия пользователя: <span style="font-weight: 500">${surname}<span/></div>
      <div style="margin-bottom: 10px; font-weight: bold;">Организация пользователя: <span style="font-weight: 500">${companyName}<span/></div>
      <div style="margin-bottom: 20px; font-weight: bold;">Телефон пользователя: <span style="font-weight: 500">${telephone}<span/></div>
      <div style="margin-bottom: 20px; font-weight: bold;">Сообщение пользователя: <span style="font-weight: 500">${text}<span/></div>
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
      text: '',
      html: `<div style="margin-bottom: 10px; font-weight: bold;">Почта пользователя: <span style="font-weight: 500">${email}</span></div>
      <div style="margin-bottom: 10px; font-weight: bold;">ФИО пользователя: <span style="font-weight: 500">${surname} ${name} ${patronymic} </span></div>
      <div style="margin-bottom: 10px; font-weight: bold;">Телефон пользователя: <span style="font-weight: 500">${telephone}</span></div>
      <div style="margin-bottom: 10px; font-weight: bold;">Дополнительный текст: <span style="font-weight: 500">${text}</span></div>`,
    });
  }

  async sendMixtureOrder(
    name: string,
    phone: string,
    address: string,
    email: string,
    count: string,
    price: number,
    mixtureType: string,
    mixture: string,
    text: string,
  ) {
    await this.trasporter.sendMail({
      from: process.env.SMPTP_USER,
      to: process.env.SMPTP_USER,
      subject: `Заказ на смеси и растворы: `,
      text: '',
      html: `
      <h1 style="margin-bottom: 20px; font-weight: bold; font-size: 30px">Данные заказа</h1>
      <div style="font-weight: bold;">Предварительный итог: <span style="font-weight: 500">${price} BYN</span></div>
      <div style="font-weight: bold;">Количество: <span style="font-weight: 500">${count}</span></div>
      <div style="font-weight: bold;">Тип раствора: <span style="font-weight: 500">${mixtureType}</span></div>
      <div style="font-weight: bold;">Раствор: <span style="font-weight: 500">${mixture}</span></div>
      <h1 style="margin-bottom: 20px; font-weight: bold; font-size: 30px">Данные заказчика</h1>
      <div style="font-weight: bold;">Почта пользователя: <span style="font-weight: 500">${email}</span></div>
      <div style="font-weight: bold;">Имя организации либо ФИО заказчика: <span style="font-weight: 500">${name}</span></div>
      <div style="font-weight: bold;">Телефон пользователя: <span style="font-weight: 500">${phone}</span></div>
      <div style="font-weight: bold;">Адрес: <span style="font-weight: 500">${address}</span></div>
      <div style="font-weight: bold;">Дополнительный текст: <span style="font-weight: 500">${text}</span></div>`,
    });
  }
  async sendVehicleOrder(
    name: string,
    phone: string,
    address: string,
    email: string,
    hoursCount: string,
    price: number,
    vehicle: string,
    date: string,
    text: string,
  ) {
    await this.trasporter.sendMail({
      from: process.env.SMPTP_USER,
      to: process.env.SMPTP_USER,
      subject: `Заказ на технику: `,
      text: '',
      html: `
      <h1 style="margin-bottom: 20px; font-weight: bold; font-size: 30px">Данные заказа</h1>
      <div style="font-weight: bold;">Предварительный итог: <span style="font-weight: 500">${price} BYN</span></div>
      <div style="font-weight: bold;">Количество арендных часов: <span style="font-weight: 500">${hoursCount} часов</span></div>
      <div style="font-weight: bold;">Техника: <span style="font-weight: 500">${vehicle}</span></div>
      <div style="font-weight: bold;">Дата аренды: <span style="font-weight: 500">${date}</span></div>
      <h1 style="margin-bottom: 20px; font-weight: bold; font-size: 30px">Данные пользователя</h1>
      <div style="font-weight: bold;">Почта заказчика: <span style="font-weight: 500">${email}</span></div>
      <div style="font-weight: bold;">Имя организации либо ФИО заказчика: <span style="font-weight: 500">${name}</span></div>
      <div style="font-weight: bold;">Телефон пользователя: <span style="font-weight: 500">${phone}</span></div>
      <div style="font-weight: bold;">Адрес: <span style="font-weight: 500">${address}</span></div>
      <div style="font-weight: bold;">Дополнительный текст: <span style="font-weight: 500">${text}</span></div>`,
    });
  }
}

export default new MailService();
