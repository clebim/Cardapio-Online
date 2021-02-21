import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import bcrypt from 'bcryptjs';
import { ResetPasswordValidator } from '../../../Validators/User/ResetPasswordValidator';
import ForgotPasswordRepositoryInterface from '../../../../Typeorm/Repositories/ForgotPassword/ForgotPasswordRepositoryInterface';
import UserRepositoryInterface from '../../../../Typeorm/Repositories/User/UserRepositoryInterface';
import ForgotPasswordServiceResponseInterface from '../Interfaces/ForgotPasswordServiceResponseInterface';
import ResetPasswordDataInterface from '../Interfaces/ResetPasswordDataInterface';
import User from '../../../../Typeorm/Entities/User';

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('ForgotPasswordRepository')
    private forgotPasswordRepository: ForgotPasswordRepositoryInterface,
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async resetPassword(
    data: ResetPasswordDataInterface,
  ): Promise<ForgotPasswordServiceResponseInterface> {
    if (
      !ResetPasswordValidator.isValidSync(data, {
        abortEarly: true,
      })
    ) {
      const errorMessage: string = await ResetPasswordValidator.validate(data, {
        abortEarly: true,
      }).catch(error => {
        return error.errors[0];
      });

      return {
        success: false,
        message: errorMessage,
      };
    }

    const hashExists = await this.forgotPasswordRepository.verifyHashExists(
      data.hash,
    );

    if (!hashExists) {
      return {
        success: false,
        message: 'Hash inválido',
      };
    }

    const difference = differenceInHours(hashExists.expires_at, Date.now());

    if (difference < 0) {
      return {
        success: false,
        message: 'refresh token expirado',
      };
    }

    const user = await this.forgotPasswordRepository.getUserByHash(data.hash);

    if (!(await bcrypt.compare(data.old_password, user.password as string))) {
      return {
        success: false,
        message: 'Senha não coincide com a antiga',
      };
    }

    const response = await this.userRepository.resetPassword(
      user as User,
      data.password,
    );

    if (!response) {
      return {
        success: false,
        message: 'Falha desconhecida ao alterar senha',
      };
    }

    const revoged = await this.forgotPasswordRepository.revogedHash(data.hash);

    if (!revoged) {
      return {
        success: false,
        message: 'Falha desconhecida ao alterar senha',
      };
    }

    return {
      success: true,
      message: 'Senha alterada com sucesso',
    };
  }
}
