// import request from 'supertest';
// import app from '../../src/app';

// let access_token = '';

// describe('Forgot Password', () => {
//   beforeEach(async () => {
//     await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error

//     const response = await request(app).post('/auth/login').send({
//       email: 'crebimTeste@gmail.com',
//       password: '123456',
//     });

//     const aux = response.body.tokens.access_token;

//     access_token = `Bearer ${aux}`;
//   });

//   it('should be able to create a new menuSection', async () => {
//     const response = await request(app)
//       .post('/menu_section/store')
//       .send({
//         section_name: 'refrigerante',
//       })
//       .set({
//         Authorization: access_token,
//       });

//     expect(response.body.success).toBe(true);
//     expect(response.body.section.section_name).toBe('refrigerante');
//   });

//   it('should be able to set section with not active', async () => {
//     const response = await request(app)
//       .post('/menu_section/set_not_active')
//       .send({
//         section_id: 1,
//       })
//       .set({
//         Authorization: access_token,
//       });

//     expect(response.body.success).toBe(true);
//   });

//   it('should be able to set section with active', async () => {
//     const response = await request(app)
//       .post('/menu_section/set_active')
//       .send({
//         section_id: 1,
//       })
//       .set({
//         Authorization: access_token,
//       });

//     expect(response.body.success).toBe(true);
//   });

//   afterAll(async () => {
//     await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
//   });
// });
