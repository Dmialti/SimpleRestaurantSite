import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { TestingModule, Test, TestingModuleBuilder } from '@nestjs/testing';
import { ExecutionResult } from 'graphql';
import request from 'supertest';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from '../../../../src/app.module';
import { PrismaService } from '../../../../src/prisma/prisma.service';
import { adminData } from '../../adminUser';
import { Server } from 'http';
import { ProviderMock } from './interfaces/ProviderMock.interface';

export class IntegrationTestManager {
  public httpServer: Server;

  private app: NestFastifyApplication;
  private prisma: PrismaService;
  private accessToken?: string;

  constructor(private readonly mocks: ProviderMock[] = []) {}

  async beforeAll(): Promise<void> {
    let moduleBuilder: TestingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

    this.mocks.forEach((mock) => {
      moduleBuilder = moduleBuilder
        .overrideProvider(mock.token)
        .useValue(mock.useValue);
    });

    const moduleFixture: TestingModule = await moduleBuilder.compile();

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
