/* eslint-disable no-undef */

const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../../../app');
const config = require('../../../config');

describe('GET /profile', () => {
  test('Does not allow unauthorized access', async () => {
    const response = await request(app).get('/profile');

    expect(response.status).toBe(401);
  });

  test('Responds with the profile of the currently authenticated user', async () => {
    const payload = {
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
    };

    const token = jwt.sign(payload, config.auth.accessToken.secret, {
      expiresIn: config.auth.accessToken.validity,
    });

    const response = await request(app).get('/profile').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.user).toEqual(payload);
  });
});
