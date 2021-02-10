import { Router } from 'express';
import { formatISO, parseISO } from 'date-fns';
import UserController from '../App/Http/Modules/User/UserController';
import SessionController from '../App/Http/Modules/Session/SessionController';
import RefreshTokenController from '../App/Http/Modules/RefreshToken/RefreshTokenController';

import AuthMiddleware from '../App/Http/Middlewares/auth';
import ForgotPasswordController from '../App/Http/Modules/ForgotPassword/ForgotPasswordController';

const routes = Router();

routes.get('/teste', (req, res) => {
  return res.json({
    teste: formatISO(1612914962892),
    volta: parseISO('2021-02-09 20:55:00', { additionalDigits: 2 }),
  });
});

// User Routes
routes.post('/auth/register', UserController.create);

routes.post('/auth/login', SessionController.create);

routes.post('/auth/refresh_token', RefreshTokenController.create);

routes.post(
  '/auth/forgot_password',
  ForgotPasswordController.getVerificationCode,
);

routes.post(
  '/auth/forgot_password/verify_code',
  ForgotPasswordController.verifyCode,
);
routes.post('/auth/reset_password', ForgotPasswordController.resetPassword);

// after the line all routes have authMiddleware
routes.use(AuthMiddleware);

export default routes;
