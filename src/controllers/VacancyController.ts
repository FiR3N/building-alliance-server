import { NextFunction, Request, Response } from 'express';
import { ServiceModel, ServicesInfosModel } from '../models/models.js';
import { UploadedFile } from 'express-fileupload';
import { __dirname } from '../utils/conts.js';
import ApiError from '../exceptions/ApiError.js';
import VacancyService from '../services/VacancyService.js';

class VacancyController {
  async addVacancy(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, wage, occupation, experience, description } = req.body;

      const vacancy = await VacancyService.addVacancy(name, wage, experience, occupation, description);

      return res.status(200).json(vacancy);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async putVacancy(req: Request, res: Response, next: NextFunction) {
    try {
      const vacancyId = Number(req.params.vacancyId);
      const { name, wage, occupation, experience, description } = req.body;

      const updatedVacancy = await VacancyService.putVacancy(
        vacancyId,
        name,
        wage,
        occupation,
        experience,
        description,
      );

      return res.status(200).json(updatedVacancy);
    } catch (e) {
      next(e);
    }
  }
  async deleteVakancy(req: Request, res: Response, next: NextFunction) {
    try {
      const vacancyId = Number(req.params.vacancyId);

      const vakancy = await VacancyService.deleteVacancy(vacancyId);

      if (!vakancy) {
        return next(ApiError.BadRequest('Услуга с таким Id не найдена', []));
      }

      return res.status(200).json(vakancy);
    } catch (e) {
      next(e);
    }
  }
  async getVacancies(req: Request, res: Response, next: NextFunction) {
    try {
      const vacancies = await VacancyService.getVacancies();

      return res.status(200).json(vacancies);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new VacancyController();
