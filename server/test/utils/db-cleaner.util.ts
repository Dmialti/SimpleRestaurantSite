import { PrismaService } from '../../src/prisma/prisma.service';

export const cleanDb = async (prisma: PrismaService) => {
  await prisma.$transaction([
    prisma.dish.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
