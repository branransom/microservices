import request from 'supertest';

import { app } from '../../app';

const VALIDATION_SCENARIOS = [
  { email: 'test@test.com', password: 'password', expectedStatusCode: 201, description: 'valid' },
  { email: 'test', password: 'password', expectedStatusCode: 400, description: 'invalid email' },
  { email: 'test@test.com', password: 'p', expectedStatusCode: 400, description: 'invalid password' },
  { email: 'test@test.com', password: undefined, expectedStatusCode: 400, description: 'missing password' },
  { email: undefined, password: 'password', expectedStatusCode: 400, description: 'missing email' },
];

VALIDATION_SCENARIOS.forEach(({ email, password, expectedStatusCode, description }) => {
  it(`returns a ${expectedStatusCode}: ${description}`, async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email,
        password,
      })
      .expect(expectedStatusCode);
  });
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
