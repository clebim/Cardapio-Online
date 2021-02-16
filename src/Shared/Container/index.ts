import { container } from 'tsyringe';
import PhotoUserRepositoryInterface from '../../App/Http/Modules/PhotoUserProfile/Interfaces/PhotoUserRepositoryInterface';
import PhotoUserRepository from '../../App/Http/Modules/PhotoUserProfile/PhotoUseRepository';
import MailServiceInterface from '../Services/MailService/Interfaces/MailServiceInterface';
import MailService from '../Services/MailService/MailService';
import MailTemplateServiceInterface from '../Services/MailTemplate/Interfaces/MailTemplateServiceInterface';
import MailTemplateService from '../Services/MailTemplate/MailTemplateService';
import ForgotPasswordRepository from '../../App/Http/Modules/ForgotPassword/ForgotPasswordRepository';
import ForgotPasswordRepositoryInterface from '../../App/Http/Modules/ForgotPassword/Interfaces/ForgotPasswordRepositoryInterface';
import SessionRepositoryInterface from '../../App/Http/Modules/Session/Interfaces/SessionRepositoryInterface';
import SessionRepository from '../../App/Http/Modules/Session/SessionRepository';
import UserRepositoryInterface from '../../App/Http/Modules/User/Interfaces/UserRepositoryInterface';
import UserRepository from '../../App/Http/Modules/User/UserRepository';
import RefreshTokenInterface from '../Services/RefreshToken/Interfaces/RefreshTokenRepositoryInterface';
import RefreshTokenRepository from '../Services/RefreshToken/RefreshTokenRepository';
import RefreshTokenService from '../Services/RefreshToken/RefreshTokenService';

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<SessionRepositoryInterface>(
  'SessionRepository',
  SessionRepository,
);

container.registerSingleton<RefreshTokenInterface>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);

container.registerSingleton('RefreshTokenService', RefreshTokenService);

container.registerSingleton<ForgotPasswordRepositoryInterface>(
  'ForgotPasswordRepository',
  ForgotPasswordRepository,
);

container.registerSingleton<MailTemplateServiceInterface>(
  'MailTemplateService',
  MailTemplateService,
);

container.registerSingleton<PhotoUserRepositoryInterface>(
  'PhotoUserRepository',
  PhotoUserRepository,
);

container.registerSingleton<MailServiceInterface>('MailService', MailService);
