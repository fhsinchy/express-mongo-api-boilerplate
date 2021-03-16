/* eslint-disable no-undef */

require('dotenv').config();

const request = require('supertest');
const jwt = require('jsonwebtoken');
mongoose = require('mongoose');
const app = require('../../../app');

describe('GET /profile', () => {
  test('Does not allow unauthorized access', async () => {
    const response = await request(app).get('/profile');

    expect(response.status).toBe(401);
  });

  test('Responds with the profile of the currently authenticated user', async () => {
    const payload = {
      id: mongoose.Types.ObjectId(),
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '5m',
    });

    const response = await request(app).get('/profile').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    // expect(response.body.data.user).toEqual(payload);
  });
});
