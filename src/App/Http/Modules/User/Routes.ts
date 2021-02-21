import { Router } from 'express';
import multer from 'multer';
import UserController from './UserController';
import AuthMiddleware from '../../Middlewares/auth';
import { profilePhotoMulterConfig } from '../../../../Config/Multer';

const routes = Router();

const upload = multer(profilePhotoMulterConfig);

// User Routes
routes.post('/auth/register', UserController.create);

routes.post(
  '/user/profile_photo',
  AuthMiddleware,
  upload.single('image'),
  UserController.storePhotoUser,
);

routes.post('/users', UserController.indexByName);

export default routes;
