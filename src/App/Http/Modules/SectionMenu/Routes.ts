import { Router } from 'express';
import SectionMenuController from './SectionMenuController';
import VerifySectionOwner from '../../Middlewares/VerifySectionOwner';
import AuthMiddleware from '../../Middlewares/auth';

const routes = Router();

routes.post('/menu_section/store', AuthMiddleware, SectionMenuController.store);

routes.put(
  '/menu_section/set_active/:id',
  AuthMiddleware,
  VerifySectionOwner,
  SectionMenuController.changeIsActive,
);

routes.delete(
  '/menu_section/delete/:id',
  AuthMiddleware,
  VerifySectionOwner,
  SectionMenuController.delete,
);

export default routes;
