import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../../../Config/AuthConfig';
import { sessionSchemaValidator } from '../../Validators/Session/CreateSessionValidator';
import SessionDataInterface from './Interfaces/SessionDataInterface';
import SessionServiceResponseInterface from './Interfaces/SessionServiceResponseInterface';
import RefreshTokenService from '../../../../Shared/Services/RefreshToken/RefreshTokenService';
import UserRepositoryInterface from '../../../Typeorm/Repositories/User/UserRepositoryInterface';

@injectable()
export default class SessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('RefreshTokenService')
    private refreshTokenService: RefreshTokenService,
  ) {}

  async executeLogin(
    data: SessionDataInterface,
  ): Promise<SessionServiceResponseInterface> {
    if (!sessionSchemaValidator.isValidSync(data, { abortEarly: true })) {
      const errorMessage: string = await sessionSchemaValidator
        .validate(data, {
          abortEarly: true,
        })
        .catch(error => {
          return error.errors[0];
        });

      return {
        success: false,
        message: errorMessage,
        tokens: null,
      };
    }

    const { email, password } = data;

    const userExist = await this.userRepository.findOneByEmail(email);

    if (!userExist) {
      return {
        success: false,
        message: 'Usuário não encontrado',
        tokens: null,
      };
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      return {
        success: false,
        message: 'Senha inválida',
        tokens: null,
      };
    }

    const { id } = userExist;

    userExist.password = '';

    const refresh_token = await this.refreshTokenService.createRefreshToken(id);

    return {
      success: true,
      message: 'Login realizado com sucesso',
      tokens: {
        access_token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
        refresh_token,
      },
      user: userExist,
    };
  }
}
