import { Router } from 'express';
import SectionMenuController from './SectionMenuController';
import VerifySectionOwner from '../../Middlewares/VerifySectionOwner';
import AuthMiddleware from '../../Middlewares/auth';

const routes = Router();

routes.use(AuthMiddleware);

routes.post('/menu_section/store', SectionMenuController.store);

routes.put(
  '/menu_section/set_active/:id',
  VerifySectionOwner,
  SectionMenuController.changeIsActive,
);

routes.delete(
  '/menu_section/delete/:id',
  VerifySectionOwner,
  SectionMenuController.delete,
);

export default routes;
