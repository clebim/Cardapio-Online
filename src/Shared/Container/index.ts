import { container } from 'tsyringe';
import SessionRepositoryInterface from '../../App/Http/Modules/Session/Interfaces/SessionRepositoryInterface';
import SessionRepository from '../../App/Http/Modules/Session/SessionRepository';
import UserRepositoryInterface from '../../App/Http/Modules/User/Interfaces/UserRepositoryInterface';
import UserRepository from '../../App/Http/Modules/User/UserRepository';
import RefreshTokenInterface from '../RefreshToken/Interfaces/RefreshTokenRepositoryInterface';
import RefreshTokenRepository from '../RefreshToken/RefreshTokenRepository';
import RefreshTokenService from '../RefreshToken/RefreshTokenService';

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
