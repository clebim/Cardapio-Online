import { Router } from 'express';
import multer from 'multer';
import UserController from '../App/Http/Modules/User/UserController';
import SessionController from '../App/Http/Modules/Session/SessionController';
import RefreshTokenController from '../App/Http/Modules/RefreshToken/RefreshTokenController';
import PhotoUserController from '../App/Http/Modules/PhotoUserProfile/PhotoUserController';
import SectionMenuController from '../App/Http/Modules/SectionMenu/SectionMenuController';

import AuthMiddleware from '../App/Http/Middlewares/auth';
import ForgotPasswordController from '../App/Http/Modules/ForgotPassword/ForgotPasswordController';
import Multer from '../Config/Multer';

const routes = Router();
const upload = multer(Multer);

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

// after this line all routes have authMiddleware
routes.use(AuthMiddleware);

routes.post(
  '/user/profile_photo',
  upload.single('image'),
  PhotoUserController.store,
);

routes.post('/menu_section/store', SectionMenuController.store);
routes.post(
  '/menu_section/set_active/:id',
  SectionMenuController.changeIsActive,
);
routes.get('/menu_section/delete/:id', SectionMenuController.delete);

export default routes;
