import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import { addMinutes, differenceInHours } from 'date-fns';
import bcrypt from 'bcryptjs';
import ForgotPasswordMailJob from '../../../Jobs/ForgotPassword/ForgotPasswordMailJob';
import { ResetPasswordValidator } from '../../Validators/User/ResetPasswordValidator';
import ForgotPasswordRepositoryInterface from './Interfaces/ForgotPasswordRepositoryInterface';
import ForgotPasswordServiceResponseInterface from './Interfaces/ForgotPasswordServiceResponseInterface';
import QueueService from '../../../../Shared/Services/QueueService/QueueService';
import ResetPasswordDataInterface from './Interfaces/ResetPasswordDataInterface';
import User from '../../Entities/User';

@injectable()
export default class ForgotPasswordService {
  constructor(
    @inject('ForgotPasswordRepository')
    private forgotPasswordRepository: ForgotPasswordRepositoryInterface,
  ) {}

  async getHashForgotPassword(
    email: string,
  ): Promise<ForgotPasswordServiceResponseInterface> {
    if (email === undefined || email === null) {
      return {
        success: false,
        message: 'Obrigatório enviar o email',
      };
    }

    const userExists = await this.forgotPasswordRepository.findUser(email);

    if (!userExists) {
      return {
        success: false,
        message: 'Usuário não encontrado',
      };
    }

    const hash = crypto.randomBytes(3).toString('hex').toUpperCase();

    const expires_at = addMinutes(Date.now(), 30);

    const variables = {
      name: userExists.restaurant_name,
      email: userExists.email,
      hash,
    };

    QueueService.add(ForgotPasswordMailJob.key, { variables });

    await this.forgotPasswordRepository.createHash({
      hash,
      expires_at,
      user_id: userExists.id,
    });

    return {
      success: true,
      message: 'hash gerado com sucesso e enviado ao email informado',
    };
  }

  async verifyCode(
    hash: string,
  ): Promise<ForgotPasswordServiceResponseInterface> {
    const hashExists = await this.forgotPasswordRepository.verifyHashExists(
      hash,
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

    return {
      success: true,
      message: 'Hash válido',
    };
  }

  async resetPassword(
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

    const verifyCode = await this.verifyCode(data.hash);

    if (!verifyCode.success) {
      return {
        success: false,
        message: 'Token inválido',
      };
    }

    const user = await this.forgotPasswordRepository.getUserByHash(data.hash);

    if (!(await bcrypt.compare(data.old_password, user.password as string))) {
      return {
        success: false,
        message: 'Senha não coincide com a antiga',
      };
    }

    const response = await this.forgotPasswordRepository.resetPassword(
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
