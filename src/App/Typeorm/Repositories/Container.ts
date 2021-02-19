import { container } from 'tsyringe';
import UserRepositoryInterface from './User/UserRepositoryInterface';
import UserRepository from './User/UserRepository';
import ForgotPasswordRepositoryInterface from './ForgotPassword/ForgotPasswordRepositoryInterface';
import ForgotPasswordRepository from './ForgotPassword/ForgotPasswordRepository';
import ProfilePhotoRepositoryInterface from './ProfilePhoto/ProfilePhotoRepositoryInterface';
import ProfilePhotoRepository from './ProfilePhoto/ProfilePhotoRepository';
import SectionMenuRepositoryInterface from './SectionMenu/SectionMenuRepositoryInterface';
import SectionMenuRepository from './SectionMenu/SectionMenuRepository';

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

container.registerSingleton<SectionMenuRepositoryInterface>(
  'SectionMenuRepository',
  SectionMenuRepository,
);
