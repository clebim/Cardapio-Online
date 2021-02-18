import request from 'supertest';
import app from '../src/app';

describe('CreateSession', () => {
  // await loading environment variables
  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });

  it('should be able to create a new session', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'crebimTeste@gmail.com',
      password: '123456',
    });

    expect(response.body.success).toBe(true);
    expect(response.body.tokens).toHaveProperty('access_token');
  });

  it('should not be able to create a new session with a user that does not exist', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'crebimTesteErrado@gmail.com',
      password: '123456',
    });

    expect(response.body.success).toBe(false);
    expect(response.body.tokens).toBe(null);
  });

  it('should not be able to create a new session with incorrect password', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'crebimTeste@gmail.com',
      password: '000000',
    });

    expect(response.body.success).toBe(false);
    expect(response.body.tokens).toBe(null);
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });
});
