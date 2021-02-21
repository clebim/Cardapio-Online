import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import ForgotPasswordRepositoryInterface from '../../../../Typeorm/Repositories/ForgotPassword/ForgotPasswordRepositoryInterface';
import ForgotPasswordServiceResponseInterface from '../Interfaces/ForgotPasswordServiceResponseInterface';

@injectable()
export default class VerifyHashService {
  constructor(
    @inject('ForgotPasswordRepository')
    private forgotPasswordRepository: ForgotPasswordRepositoryInterface,
  ) {}

  public async execute(
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
}
