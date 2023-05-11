import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService.js';
import { UploadedFile } from 'express-fileupload';

class UserController {
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, surname, patronymic, login, password, roleId } = req.body;
      const image = req.files?.image as UploadedFile;

      const user = await UserService.addUser(name, surname, patronymic, login, password, image, roleId);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  async putUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const { name, surname, patronymic, login, password, roleId } = req.body;
      const image = req.files?.image as UploadedFile;

      const updatedUser = await UserService.putUser(
        userId,
        name,
        surname,
        patronymic,
        login,
        image,
        next,
        password,
        roleId,
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  async putUserByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const { name, surname, patronymic, login } = req.body;
      const image = req.files?.image as UploadedFile;

      const updatedUser = await UserService.putUser(userId, name, surname, patronymic, login, image, next);

      res.cookie('refreshToken', updatedUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return res.status(200).json(updatedUser.user);
    } catch (e) {
      next(e);
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);

      const user = await UserService.deleteUser(userId, next);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const user = await UserService.getUserById(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
