import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export type Token = {
  userId: any
  userName: string
}
const isOwner = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
  try {
    const token: string = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(
      token,
      String(process.env.TOKEN_SECRET).toString(),
    ) as Token;
    if (!userId) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
  return next();
};

export default isOwner;
