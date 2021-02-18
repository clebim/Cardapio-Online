import request from 'supertest';
import app from '../src/app';

describe('RefreshToken', () => {
  // await loading environment variable

  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });

  it('shoulb be able to get a new access_token with refresh_token', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'crebimTeste@gmail.com',
      password: '123456',
    });
    const responseRefreshToken = await request(app)
      .post('/auth/refresh_token')
      .send({
        refresh_token: response.body.tokens.refresh_token,
      });

    expect(responseRefreshToken.body.success).toBe(true);
    expect(responseRefreshToken.body.tokens).toHaveProperty('access_token');
    expect(responseRefreshToken.body.tokens).toHaveProperty('refresh_token');
  });

  it('should not able to create a new access_token with invalid refresh_token', async () => {
    const responseRefreshToken = await request(app)
      .post('/auth/refresh_token')
      .send({
        refresh_token: 'asdasdasdasdasdgdfgdfgas-1-adasdasdasdasdasdasdgfgdf',
      });

    expect(responseRefreshToken.body.success).toBe(false);
    expect(responseRefreshToken.body.tokens).toBe(null);
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });
});
