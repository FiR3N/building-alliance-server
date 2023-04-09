import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError.js';

export default function errorMiddleware(err: ApiError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    console.log('error >> ', err.message);
    return res.status(err.status).json({ message: err.message, erorrs: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
