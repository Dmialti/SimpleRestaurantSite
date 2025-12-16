import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { DishModule } from './dish/dish.module';
import { ReservationModule } from './reservation/reservation.module';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    PrismaModule,
    S3Module,
    ReservationModule,
    ArticleModule,
    DishModule,
    UserModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CacheModule.register({
      isGlobal: true,
      imports: [ConfigModule], // Вказуємо залежність
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.getOrThrow<string>('REDIS_HOST'),
        port: +configService.getOrThrow<string>('REDIS_PORT'),
        ttl: 600,
      }),
    }),
  ],
})
export class AppModule {}
