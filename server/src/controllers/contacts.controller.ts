import { Request, Response } from 'express';
import {
  PrismaClient, Contacts,
} from '@prisma/client';
import { CustomRequest } from './auth.controller';

const prisma = new PrismaClient();

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const allContacts = await prisma.contacts.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
      },
      orderBy: [{ id: 'asc' }],
    });
    return res.json(allContacts);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
};

export const editContact = async (req: CustomRequest<Contacts>, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = res.locals;
    const {
      name, email, phone,
    } = req.body;
    await prisma.contacts.update({
      where: { id: Number.parseInt(id, 10) },
      data: {
        name, email, phone,
      },
    });
    const allContacts = await prisma.contacts.findMany({
      where: { ownerId: userId },
      orderBy: [{ id: 'asc' }],
    });
    return res.json(allContacts);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
};

export const addContact = async (req: CustomRequest<Contacts>, res: Response) => {
  try {
    const { userId } = res.locals;
    const {
      name, email, phone,
    } = req.body;
    await prisma.contacts.create({
      data: {
        name, email, phone, ownerId: userId,
      },
    });
    const allContacts = await prisma.contacts.findMany({
      where: { ownerId: userId },
      orderBy: [{ id: 'asc' }],
    });
    return res.json(allContacts);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = res.locals;
    await prisma.contacts.delete({ where: { id: Number.parseInt(id, 10) } });
    const allContacts = await prisma.contacts.findMany({
      where: { ownerId: userId },
      orderBy: [{ id: 'asc' }],
    });
    return res.json(allContacts);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errorMessage: error.message });
    }
    return res.status(500).json({ errorMessage: 'Ошибка сервера' });
  }
};
