import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { PrismaService } from '../../src/prisma/prisma.service';
import { TestingModule, Test } from '@nestjs/testing';
import { ExecutionResult } from 'graphql';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { adminData } from '../shared/adminUser';
import fastifyCookie from '@fastify/cookie';

export class IntegrationTestManager {
  public httpServer: any;

  private app: NestFastifyApplication;
  private prisma: PrismaService;
  private accessToken?: string;

  async beforeAll(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const fastifyAdapter = new FastifyAdapter();
    fastifyAdapter.register(fastifyCookie);

    this.app =
      moduleFixture.createNestApplication<NestFastifyApplication>(
        fastifyAdapter,
      );

    await this.app.init();

    const fastifyInstance = this.app.getHttpAdapter().getInstance();
    await fastifyInstance.ready();

    await fastifyInstance.listen({ port: 0 });

    this.httpServer = this.app.getHttpServer();

    this.prisma = this.app.get(PrismaService);

    const loginQuery = `
            mutation {
                logIn(input: { email: "${adminData.email}", password: "${adminData.password}" }) {
                    accessToken
                }
            }
        `;

    const loginResponse = await request(this.httpServer)
      .post('/graphql')
      .send({ query: loginQuery })
      .expect(200);

    const body = loginResponse.body as ExecutionResult<{
      logIn: { accessToken: string };
    }>;
    this.accessToken = body.data?.logIn.accessToken;
  }

  async afterAll(): Promise<void> {
    await this.app.getHttpAdapter().getInstance().close();
    await this.app.close();
  }

  getAccessToken(): string | undefined {
    return this.accessToken;
  }
}
