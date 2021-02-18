import request from 'supertest';
import app from '../src/app';

describe('CreateUser', () => {
  // await loading environment variables
  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/auth/register').send({
      restaurant_name: 'Restaurante do Crebim',
      email: 'crebimTeste@gmail.com',
      password: '123456',
      confirmation_password: '123456',
      phone: '(34) 998711646',
      city: 'Uberlandia',
      neighborhood: 'Cidade Jardim',
      street: 'Rua das rosas',
      number: '730',
      zip_code: '38124-134',
    });

    expect(response.body.success).toBe(true);
    expect(response.body.user.id).toBe(1);
  });

  it('should not be able to create a new user with same email from another', async () => {
    const response = await request(app).post('/auth/register').send({
      restaurant_name: 'Restaurante do Crebim',
      email: 'crebimTeste@gmail.com',
      password: '123456',
      confirmation_password: '123456',
      phone: '(34) 998711646',
      city: 'Uberlandia',
      neighborhood: 'Cidade Jardim',
      street: 'Rua das rosas',
      number: '730',
      zip_code: '38124-134',
    });

    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new user with password and differente condirmation password ', async () => {
    const response = await request(app).post('/auth/register').send({
      restaurant_name: 'Restaurante do Crebim',
      email: 'crebim@gmail.com',
      password: '123456',
      confirmation_password: '000000',
      phone: '(34) 998711646',
      city: 'Uberlandia',
      neighborhood: 'Cidade Jardim',
      street: 'Rua das rosas',
      number: '730',
      zip_code: '38124-134',
    });

    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });
});
