import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  constructor() {}
  user = prisma.user;
  pokemon = prisma.pokemon;
}
