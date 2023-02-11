import request from 'supertest';
const app = require('../../index');

describe('given a email and password', () => {
  test('Should respond with a json object contain user data', async () => {
    const response = await request(app).post('/user/authenticate').send({
      email: 'gabriel@gmail.com',
      password: '123',
    });
    expect(response.body.userFormatted.user).toBeDefined();
  });
  test('Should specify json in the content type header', async () => {
    const response = await request(app).post('/user/register').send({
      name: 'Gabriel',
      email: 'gabrielmtvp@gmail.com',
      password: 'hash',
    });
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });
});

describe('when the username and password is missing', () => {
  test('Should respond with a status code 400', async () => {
    const response = await request(app).post('/user/authenticate').send({
      email: 'email',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('Requesting rolling the slot machine', () => {
  test('Should respond with a json object slots machine data', async () => {
    const response = await request(app).get('/slotMachine');
    expect(response.type).toEqual('application/json');
  });
});
