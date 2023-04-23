import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import { Employees } from '../../models/models.js';
import { EMPLOYEE_PLUG_IMG, __dirname } from '../../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';
import ApiError from '../../exceptions/ApiError.js';

class EmployeeService {
  async addEmployee(
    name: string,
    surname: string,
    patronymic: string,
    description: string,
    isShowable: boolean,
    entry_to_work: Date,
    post: string,
    telephone: string,
    email: string,
    img: UploadedFile,
  ) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      await img.mv(path.resolve(__dirname, 'static', 'employees', imgPathname));
    } else {
      imgPathname = EMPLOYEE_PLUG_IMG;
    }

    const employee = await Employees.create({
      name,
      surname,
      patronymic,
      description,
      img: imgPathname,
      isShowable,
      entry_to_work,
      post,
      telephone,
      email,
    });

    return employee;
  }

  async putEmployee(
    employeeId: number,
    name: string,
    surname: string,
    patronymic: string,
    description: string,
    isShowable: boolean,
    entry_to_work: Date,
    post: string,
    telephone: string,
    email: string,
    img: UploadedFile,
  ) {
    let imgPathname: string;

    if (img) {
      imgPathname = v4() + '.jpg';
      img.mv(path.resolve(__dirname, 'static', 'employees', imgPathname));
    } else {
      imgPathname = EMPLOYEE_PLUG_IMG;
    }

    const employee = await Employees.update(
      {
        name,
        surname,
        patronymic,
        description,
        img: imgPathname,
        isShowable,
        entry_to_work,
        post,
        telephone,
        email,
      },
      { where: { $id$: employeeId } },
    );

    return employee;
  }

  async deleteEmployee(employeeId: number, next: NextFunction) {
    const employee = await Employees.findOne({ where: { $id$: employeeId } });
    if (employee)
      if (employee?.img != EMPLOYEE_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'employees', employee?.img!), (err: any) => {
          if (err) next(err);
          console.log(`employee/${employee?.img}.jpg was deleted`);
        });
      }
    await Employees.destroy({ where: { $id$: employeeId } });
    return employee;
  }
}

export default new EmployeeService();
