import { container } from 'tsyringe';
import MailServiceInterface from '../Services/MailService/Interfaces/MailServiceInterface';
import MailService from '../Services/MailService/MailService';
import MailTemplateServiceInterface from '../Services/MailTemplate/Interfaces/MailTemplateServiceInterface';
import MailTemplateService from '../Services/MailTemplate/MailTemplateService';
import RefreshTokenInterface from '../Services/RefreshToken/Interfaces/RefreshTokenRepositoryInterface';
import RefreshTokenRepository from '../Services/RefreshToken/RefreshTokenRepository';
import RefreshTokenService from '../Services/RefreshToken/RefreshTokenService';
import '../../App/Typeorm/Repositories/Container';

container.registerSingleton<RefreshTokenInterface>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);

container.registerSingleton('RefreshTokenService', RefreshTokenService);

container.registerSingleton<MailTemplateServiceInterface>(
  'MailTemplateService',
  MailTemplateService,
);

container.registerSingleton<MailServiceInterface>('MailService', MailService);
