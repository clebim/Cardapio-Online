import { container } from 'tsyringe';
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
