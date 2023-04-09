import { NextFunction, Request, Response } from 'express';
import { Employees } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import path from 'path';
import { EMPLOYEE_PLUG_IMG } from '../utils/conts.js';
class EmployeeController {
  async addEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, surname, patronymic, isShowable, entry_to_work, post, telephone, email } = req.body;
      let img = req.files?.img as UploadedFile;
      let imgPathname: string;

      if (img) {
        imgPathname = v4() + '.jpg';
        img.mv(path.resolve(__dirname, 'static', 'employees', imgPathname));
      } else {
        imgPathname = EMPLOYEE_PLUG_IMG;
      }

      const employee = await Employees.create({
        name,
        surname,
        patronymic,
        img: imgPathname,
        isShowable,
        entry_to_work,
        post,
        telephone,
        email,
      });
      return res.status(200).json(employee);
    } catch (e) {
      next(e);
    }
  }
  async putEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { employeeId } = req.params;
      const { name, surname, patronymic, img, isShowable, entry_to_work, post, telephone, email } = req.body;
      const employee = await Employees.update(
        {
          name,
          surname,
          patronymic,
          img,
          isShowable,
          entry_to_work,
          post,
          telephone,
          email,
        },
        { where: { $id$: employeeId } },
      );
      return res.status(200).json(employee);
    } catch (e) {
      next(e);
    }
  }
  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { employeeId } = req.params;
      const employee = await Employees.findOne({ where: { $id$: employeeId } });
      await Employees.destroy({ where: { $id$: employeeId } });
      return res.status(200).json(employee);
    } catch (e) {
      next(e);
    }
  }
}

export default new EmployeeController();
