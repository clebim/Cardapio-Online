import { Router } from 'express';
import multer from 'multer';

import { ItemPhotoMulterConfig } from '../../../../Config/Multer';
import MenuItemController from './MenuItemController';
import VerifyItemOwner from '../../Middlewares/VerifyItemOwner';
import AuthMiddleware from '../../Middlewares/auth';

const upload = multer(ItemPhotoMulterConfig);
const routes = Router();

routes.get('/user/items/:id', MenuItemController.getUserItems);

routes.use(AuthMiddleware);

routes.post('/items/store', upload.single('image'), MenuItemController.store);

routes.get('/items/index', MenuItemController.index);
routes.put('/items/update/:id', VerifyItemOwner, MenuItemController.update);

routes.put(
  '/items/photo/update/:id',
  VerifyItemOwner,
  upload.single('image'),
  MenuItemController.updateItemPhoto,
);

routes.delete('/items/delete/:id', VerifyItemOwner, MenuItemController.delete);

export default routes;
