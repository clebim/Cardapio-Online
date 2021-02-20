import { container } from 'tsyringe';
import UserRepositoryInterface from './User/UserRepositoryInterface';
import UserRepository from './User/UserRepository';
import ForgotPasswordRepositoryInterface from './ForgotPassword/ForgotPasswordRepositoryInterface';
import ForgotPasswordRepository from './ForgotPassword/ForgotPasswordRepository';
import ProfilePhotoRepositoryInterface from './ProfilePhoto/ProfilePhotoRepositoryInterface';
import ProfilePhotoRepository from './ProfilePhoto/ProfilePhotoRepository';
import MenuSectionRepositoryInterface from './MenuSection/MenuSectionRepositoryInterface';
import MenuSectionRepository from './MenuSection/MenuSectionRepository';
import MenuItemRepositoryInterface from './MenuItem/MenuItemRepositoryInterface';
import MenuItemRepository from './MenuItem/MenuItemRepository';
import ItemPhotoRepositoryInterface from './ItemPhoto/ItemPhotoRepositoryInterface';
import ItemPhotoRepository from './ItemPhoto/ItemPhotoRepository';

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<ForgotPasswordRepositoryInterface>(
  'ForgotPasswordRepository',
  ForgotPasswordRepository,
);

container.registerSingleton<ProfilePhotoRepositoryInterface>(
  'ProfilePhoto',
  ProfilePhotoRepository,
);

container.registerSingleton<MenuSectionRepositoryInterface>(
  'MenuSectionRepository',
  MenuSectionRepository,
);

container.registerSingleton<MenuItemRepositoryInterface>(
  'MenuItemRepository',
  MenuItemRepository,
);

container.registerSingleton<ItemPhotoRepositoryInterface>(
  'ItemPhotoRepository',
  ItemPhotoRepository,
);
