import { Test } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { cleanDb } from '../utils/db-cleaner.util';
import { ConfigModule } from '@nestjs/config';

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }),
    ],
    providers: [PrismaService],
  }).compile();

  const prisma = moduleRef.get<PrismaService>(PrismaService);

  await cleanDb(prisma);

  await moduleRef.close();
};
