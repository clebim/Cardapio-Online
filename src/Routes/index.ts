import { Router } from 'express';
import SessionController from '../App/Http/Controllers/SessionController';
import UserController from '../App/Http/Controllers/UserController';

const routes = Router();

// User Routes
routes.get('/test', (request, response) => {
  response.json({ ok: true });
});
routes.post('/register', UserController.create);
routes.post('/login', SessionController.create);

export default routes;
