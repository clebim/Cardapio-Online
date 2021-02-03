import { Router } from 'express';
import UserController from '../App/Http/Modules/User/UserController';
import SessionController from '../App/Http/Modules/Session/SessionController';
import RefreshTokenController from '../App/Http/Modules/RefreshToken/RefreshTokenController';

import AuthMiddleware from '../App/Http/Middlewares/auth';

const routes = Router();

// User Routes
routes.post('/register', UserController.create);
routes.post('/login', SessionController.create);
routes.post('/refresh_token', RefreshTokenController.create);

// after the line all routes have authMiddleware
routes.use(AuthMiddleware);

export default routes;
