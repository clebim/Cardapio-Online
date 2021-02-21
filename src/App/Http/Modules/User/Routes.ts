import { Router } from 'express';
import multer from 'multer';
import UserController from './UserController';

import { profilePhotoMulterConfig } from '../../../../Config/Multer';

const routes = Router();

const upload = multer(profilePhotoMulterConfig);

// User Routes
routes.post('/auth/register', UserController.create);

routes.post(
  '/user/profile_photo',
  upload.single('image'),
  UserController.storePhotoUser,
);

export default routes;
