import { Router } from 'express';
import AuthController from './AuthController';
import RefreshTokenController from './RefreshTokenController';

const routes = Router();

routes.post('/auth/login', AuthController.createSession);

routes.post('/auth/refresh_token', RefreshTokenController.create);

routes.post('/auth/forgot_password', AuthController.getVerificationCode);

routes.post('/auth/forgot_password/verify_code', AuthController.verifyCode);

routes.post('/auth/reset_password', AuthController.resetPassword);

export default routes;
