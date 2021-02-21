import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import { addMinutes } from 'date-fns';
import ForgotPasswordMailJob from '../../../../Jobs/ForgotPassword/ForgotPasswordMailJob';
import ForgotPasswordRepositoryInterface from '../../../../Typeorm/Repositories/ForgotPassword/ForgotPasswordRepositoryInterface';
import UserRepositoryInterface from '../../../../Typeorm/Repositories/User/UserRepositoryInterface';
import ForgotPasswordServiceResponseInterface from '../Interfaces/ForgotPasswordServiceResponseInterface';
import QueueService from '../../../../../Shared/Services/QueueService/QueueService';

@injectable()
export default class GetVerificationCodeService {
  constructor(
    @inject('ForgotPasswordRepository')
    private forgotPasswordRepository: ForgotPasswordRepositoryInterface,
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    email: string,
  ): Promise<ForgotPasswordServiceResponseInterface> {
    if (email === undefined || email === null) {
      return {
        success: false,
        message: 'Obrigatório enviar o email',
      };
    }

    const userExists = await this.userRepository.findOneByEmail(email);

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
}
