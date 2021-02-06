import request from 'supertest';
import app from '../../src/app';

describe('Forgot Password', () => {
  let hash = '';

  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });

  it('should not be able to request password change with wrong email', async () => {
    const response = await request(app).post('/auth/forgot_password').send({
      email: 'teste@gmail.com',
    });

    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to request password change with wrong code', async () => {
    const responseHash = await request(app).post('/auth/forgot_password').send({
      email: 'teste@gmail.com',
    });

    hash = responseHash.body.hash;

    const response = await request(app)
      .post('/auth/forgot_password/verify_code')
      .send({
        hash: '234S3M',
      });

    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to change the users password with wrong current password', async () => {
    const response = await request(app).post('/auth/reset_password').send({
      hash,
      old_password: 'adfsdfsdfsd',
      password: 'dddddddd',
      confirmation_password: 'dddddddd',
    });

    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  it('should be able to change the users password', async () => {
    const response = await request(app).post('/auth/reset_password').send({
      hash,
      old_password: '123456',
      password: 'asdfghjkl',
      confirmation_password: 'asdfghjkl',
    });

    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });
});
