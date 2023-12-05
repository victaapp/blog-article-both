const request = require('supertest');
const express = require('express');
const app = express();
const rootRoutes = require('./root');

app.use(express.json());
app.use(rootRoutes);

describe('POST /submit', () => {
  test('valid card number', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ cardNumber: '4111111111111111' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Card number is valid.' });
  });

  test('missing card number', async () => {
    const response = await request(app).post('/submit').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Card number is required.' });
  });

  test('invalid card number', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ cardNumber: '4111111111111112' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid card number.' });
  });
});
