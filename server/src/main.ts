import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';

async function bootstrap() {
  const whitelist: (string | RegExp)[] = ['http://localhost:5000'];

  if (process.env.CLIENT_URL) {
    whitelist.push(process.env.CLIENT_URL);
  }

  if (process.env.CLIENT_PREVIEWS_PATTERN) {
    whitelist.push(
      new RegExp(`^https://${process.env.CLIENT_PREVIEWS_PATTERN}`, 'i'),
    );
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  await app.register(multipart, {
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
  await app.register(cors, {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (whitelist.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
