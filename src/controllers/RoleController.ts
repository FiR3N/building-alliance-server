import { NextFunction, Request, Response } from 'express';
import { CertificatesModel, RoleModel } from '../models/models.js';
import { __dirname } from '../utils/conts.js';

class RoleController {
  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.roleId);
      const role = await RoleModel.findOne({ where: { id: roleId } });
      return res.status(200).json(role);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await RoleModel.findAll();
      return res.status(200).json(roles);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new RoleController();
