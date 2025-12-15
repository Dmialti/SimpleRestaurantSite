import request from 'supertest-graphql';
import { AuthResponse } from '../src/auth/entities/authResponse.entity';
import { CreateUserInput } from '../src/user/dto/createUser.input';
import gql from 'graphql-tag';
import { adminData } from './shared/adminUser';
import { User } from '../src/user/entities/user.entity';
import { IntegrationTestManager } from './shared/managers/IntegrationTestManager';

describe('Auth and User System (e2e)', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  const userData: CreateUserInput = {
    email: 'newuser@example.com',
    password: 'password123',
    role: 'MANAGER',
  };

  it('1. Should register a new user (createUser)', async () => {
    const response = await request<{ createUser: User }>(
      integrationTestManager.httpServer,
    )
      .set('Authorization', `Bearer ${integrationTestManager.getAccessToken()}`)
      .mutate(gql`
        mutation CreateUser($input: CreateUserInput!) {
          createUser(createUserInput: $input) {
            id
            email
            role
          }
        }
      `)
      .variables({ input: userData })
      .expectNoErrors();
    console.log(response);
    expect(response.data?.createUser.email).toBe(userData.email);
    expect(response.data?.createUser.role).toBe(userData.role);
  });

  it('2. Should login and get tokens', async () => {
    const response = await request<{ logIn: AuthResponse }>(
      integrationTestManager.httpServer,
    )
      .set('Authorization', `Bearer ${integrationTestManager.getAccessToken()}`)
      .mutate(
        gql`
      mutation {
        logIn(input: { email: "${userData.email}", password: "${userData.password}" }) {
          accessToken
        }
      }`,
      )
      .variables({
        email: adminData.email,
        password: adminData.password,
      })
      .expectNoErrors();

    expect(response.data?.logIn).toBeDefined();
  });
});
