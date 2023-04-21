import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError.js';

export default function authMiddleware(err: ApiError, req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Пользователь не авторизован!' });
    }
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Пользователь не авторизован!' });
  }
}
