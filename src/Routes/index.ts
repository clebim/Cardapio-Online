import { Router } from 'express';
import UserRoutes from '../App/Http/Modules/User/Routes';
import AuthRoutes from '../App/Http/Modules/Auth/Routes';
import SectionMenuRoutes from '../App/Http/Modules/SectionMenu/Routes';
import MenuItemRoutes from '../App/Http/Modules/MenuItem/Routes';

const routes = Router();

routes.use(UserRoutes);
routes.use(AuthRoutes);
routes.use(SectionMenuRoutes);
routes.use(MenuItemRoutes);

export default routes;
