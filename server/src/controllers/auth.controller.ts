import { Request, Response } from 'express';
import {
  PrismaClient, Users,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

interface SignUpForm {
    email?: string,
    password?: string,
    username?: string,
}

export interface CustomRequest<T> extends Request {
    body: T
}

const removePass = (user: Users): any => {
  const {
    password, createdAt, updatedAt, ...other
  } = user;
  return other;
};

export const signUp = async (req: CustomRequest<SignUpForm>, res: Response) => {
  const {
    email, password, username,
  } = req.body;

  if (!email || !password || !username) return res.status(400).json({ errorMessage: 'Заполните все поля' });
  try {
    const ifExist = await prisma.users.findUnique({ where: { email } });
    if (ifExist) return res.status(400).json({ message: 'Пользователь с такой почтой существует' });
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create(
      {
        data: {
          email, password: hashedPass, name: username, createdAt: new Date(), updatedAt: new Date(),
        },
      },
    );
    const token = jwt.sign(
      { userId: newUser.id, userName: newUser.name },
      String(process.env.TOKEN_SECRET).toString(),
      { expiresIn: '14d' },
    );
    return res.json({ token, user: removePass(newUser) });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
};

export const signIn = async (req: CustomRequest<SignUpForm>, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ errorMessage: 'Заполните все поля' });
  try {
    const currentUser = await prisma.users.findUnique(
      {
        where: { email },
        include: {
          contacts: true,
        },
      },
    );
    if (!currentUser) return res.status(400).json({ errorMessage: 'Пользователь не найден' });
    const checkPass = await bcrypt.compare(password, currentUser.password);
    if (!checkPass) return res.status(400).json({ errorMessage: 'Пароль неверный' });
    const token = jwt.sign(
      { userId: currentUser.id, userName: currentUser.name },
      String(process.env.TOKEN_SECRET).toString(),
      { expiresIn: '14d' },
    );

    return res.json({ token, user: removePass(currentUser) });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
};

export const validateToken = (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ errorMessage: 'Вы не авторизованный для этой операции' });
    const token: string = req.headers.authorization.split(' ')[1];
    jwt.verify(token, String(process.env.TOKEN_SECRET).toString());
    return res.json({ isValid: true });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
};
