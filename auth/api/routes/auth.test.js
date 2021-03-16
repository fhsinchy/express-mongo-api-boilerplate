/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../../../app');

function extractCookie(response) {
  return response.headers['set-cookie']
    .shift()
    .split(',')
    .map((item) => item.split(';')[0])
    .join(';');
}

const mongo = new MongoMemoryServer();

beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

describe('POST /auth/register', () => {
  test('Creates a new user in the database', async () => {
    const user = {
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
      password: 'secret',
    };
    const response = await request(app).post('/auth/register').send(user);

    expect(response.status).toBe(201);
  });
});

describe('POST /auth/login', () => {
  test('Logs in a user', async () => {
    const user = {
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
      password: 'secret',
    };
    await request(app).post('/auth/register').send(user);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );
    expect(response.headers['set-cookie'].shift()).toContain('refreshToken');
  });
});

describe('POST /auth/token/refresh', () => {
  const agent = request.agent(app);
  test('Refreshes a token', async () => {
    const user = {
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
      password: 'secret',
    };
    await request(app).post('/auth/register').send(user);
    const cookie = extractCookie(
      await agent.post('/auth/login').send({ email: user.email, password: user.password }),
    );

    const response = await agent
      .post('/auth/login')
      .set('Cookie', cookie)
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );
  });
});

describe('POST /auth/logout', () => {
  const agent = request.agent(app);
  test('Logs out a user', async () => {
    const user = {
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
      password: 'secret',
    };
    await request(app).post('/auth/register').send(user);

    const loginResponse = await agent
      .post('/auth/login')
      .send({ email: user.email, password: user.password });

    const token = loginResponse.body.accessToken;
    const cookie = extractCookie(loginResponse);

    const response = await agent
      .post('/auth/logout')
      .set('Cookie', cookie)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
