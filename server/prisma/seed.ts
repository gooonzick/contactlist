import { PrismaClient, Contacts, Users } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const load = async () => {
  const hashedPass = await bcrypt.hash('123', 10);
  try {
    await prisma.users.createMany({
      data: [
        {
          name: 'Jonathan Joestar',
          email: 'jonathan.joestar@jojo.uk',
          password: hashedPass,
        },
        {
          name: 'Joseph Joestar',
          email: 'joseph.joestar@jojo.com',
          password: hashedPass,
        },
      ] as Users[],
    });
    await prisma.contacts.createMany({
      data: [
        {
          name: 'Jotaro Kujo',
          phone: '+79999999999',
          email: 'jotaro.kujo@jojo.com',
          ownerId: 2,
        },
        {
          name: 'Josuke Higashikata',
          phone: '+79999873077',
          email: 'josuke.higashikata@jojo.com',
          ownerId: 2,
        },
        {
          name: 'Giorno Giovanna',
          phone: '+79999873088',
          email: 'giorno.giovanna@jojo.com',
          ownerId: 2,
        },
        {
          name: 'Jolyne Cujoh',
          phone: '+79999873099',
          email: 'jolyne.cujoh@jojo.com',
          ownerId: 2,
        },
      ] as Contacts[],
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
