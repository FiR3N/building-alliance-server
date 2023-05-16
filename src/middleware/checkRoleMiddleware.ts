import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import TokenService from '../services/TokenService.js';

interface CustomRequest extends Request {
  user?: any;
}

export default function (roleId: number[]) {
  return function (req: CustomRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Пользователь не авторизован!' });
      }
      const decoded = TokenService.validateAccessToken(token);
      if (roleId.includes(Number(decoded?.roleId))) {
        res.status(403).json({ message: 'Нет доступа' });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: 'Пользователь не авторизован!' });
    }
  };
}
