import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import TokenService from '../services/TokenService.js';
import ApiError from '../exceptions/ApiError.js';

interface CustomRequest extends Request {
  user?: any;
}

export default function (roleId: number[]) {
  return function (req: CustomRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);

      if (roleId.includes(Number(userData?.roleId))) {
        req.user = userData;
      } else {
        return next(ApiError.UnauthorizerError());
      }
      next();
    } catch (e) {
      return next(ApiError.UnauthorizerError);
    }
  };
}
