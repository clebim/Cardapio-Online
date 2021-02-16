import request from 'supertest';
import { resolve as resolvePath } from 'path';
import app from '../../src/app';

let access_token = '';

describe('Forgot Password', () => {
  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error

    const response = await request(app).post('/auth/login').send({
      email: 'crebimTeste@gmail.com',
      password: '123456',
    });

    const aux = response.body.tokens.access_token;

    access_token = `Bearer ${aux}`;
  });

  it('should be able to create a new profile photo', async () => {
    const response = await request(app)
      .post('/user/profile_photo')
      .attach('image', resolvePath(__dirname, 'file.jpeg'))
      .set({
        Authorization: access_token,
      });

    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('path');
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });
});
