import { Test } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { adminData } from '../shared/adminUser';
import bcrypt from 'bcrypt';
import { cleanDb } from '../utils/db-cleaner.util';
import { ConfigModule } from '@nestjs/config';

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      }),
    ],
    providers: [PrismaService],
  }).compile();

  const prisma = moduleRef.get<PrismaService>(PrismaService);

  await moduleRef.init();

  await cleanDb(prisma);

  const hashedPassword = await bcrypt.hash(adminData.password, 10);

  await prisma.user.create({
    data: {
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
    },
  });

  await moduleRef.close();
};
