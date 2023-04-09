import { Request, Response } from 'express';
import ApiError from '../exceptions/ApiError.js';

export default function errorMiddleware(err: ApiError, req: Request, res: Response) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, erorrs: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
