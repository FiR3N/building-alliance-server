import { NextFunction, Request, Response } from 'express';
import { Employees } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import EmployeeService from '../services/EmployeeService.js';
import ApiError from '../exceptions/ApiError.js';

class EmployeeController {
  async addEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, surname, patronymic, description, isShowable, entry_to_work, post, telephone, email } = req.body;
      let img = req.files?.img as UploadedFile;

      const employee = await EmployeeService.addEmployee(
        name,
        surname,
        patronymic,
        description,
        isShowable,
        entry_to_work,
        post,
        telephone,
        email,
        img,
      );

      return res.status(200).json(employee);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = Number(req.params.employeeId);
      const { name, surname, patronymic, description, isShowable, entry_to_work, post, telephone, email } = req.body;
      let img = (req.files?.img as UploadedFile) || null;

      const employee = await EmployeeService.putEmployee(
        employeeId,
        name,
        surname,
        patronymic,
        description,
        isShowable,
        entry_to_work,
        post,
        telephone,
        email,
        img,
      );

      return res.status(200).json(employee);
    } catch (e) {
      next(e);
    }
  }
  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = Number(req.params.employeeId);

      const employee = await EmployeeService.deleteEmployee(employeeId, next);

      if (!employee) {
        return next(ApiError.BadRequest('Работник с таким Id не найден', []));
      }

      return res.status(200).json(employee);
    } catch (e) {
      next(e);
    }
  }
  async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      let limit = Number(req.query.limit);
      let page = Number(req.query.page);

      let offset = page * limit - limit;

      const employees = await Employees.findAndCountAll({ limit: limit, offset: offset });

      return res.status(200).json(employees);
    } catch (e) {
      next(e);
    }
  }
}

export default new EmployeeController();
