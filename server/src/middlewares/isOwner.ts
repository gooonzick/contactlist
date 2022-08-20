import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  PrismaClient,
} from '@prisma/client';

dotenv.config();
export type Token = {
  userId: any
  userName: string
}
const prisma = new PrismaClient();
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
  try {
    const token: string = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(
      token,
      String(process.env.TOKEN_SECRET).toString(),
    ) as Token;
    res.locals.userId = Number.parseInt(userId, 10);
    const contact = await prisma.contacts.findFirst({
      where: { ownerId: userId },
    });
    if (userId !== contact?.ownerId) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
  return next();
};

export default isOwner;
