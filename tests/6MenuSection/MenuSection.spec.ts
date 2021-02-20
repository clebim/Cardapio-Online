import request from 'supertest';
import app from '../../src/app';

let access_token = '';

describe('Menu Section', () => {
  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });

  beforeAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100));

    const response = await request(app).post('/auth/login').send({
      email: 'crebimTeste@gmail.com',
      password: '123456',
    });

    const aux = response.body.tokens.access_token;

    access_token = `Bearer ${aux}`;
  });

  it('should be able to create a new menuSection', async () => {
    const response = await request(app)
      .post('/menu_section/store')
      .send({
        section_name: 'refrigerante',
      })
      .set({
        Authorization: access_token,
      });

    expect(response.body.success).toBe(true);
    expect(response.body.section.section_name).toBe('refrigerante');
  });

  it('should be able to set section as not active', async () => {
    const response = await request(app)
      .post('/menu_section/set_active/1')
      .send({ is_active: false })
      .set({
        Authorization: access_token,
      });
    expect(response.body.success).toBe(true);
  });

  it('should be able to set section as active', async () => {
    const response = await request(app)
      .post('/menu_section/set_active/1')
      .send({ is_active: true })
      .set({
        Authorization: access_token,
      });

    expect(response.body.success).toBe(true);
  });

  // it('should be able to delete a section', async () => {
  //   const response = await request(app).get('/menu_section/delete/1').set({
  //     Authorization: access_token,
  //   });

  //   expect(response.body.success).toBe(true);
  // });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });
});
