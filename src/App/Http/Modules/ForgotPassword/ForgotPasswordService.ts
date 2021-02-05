import { inject, injectable } from 'tsyringe';
import ForgotPasswordRepositoryInterface from './Interfaces/ForgotPasswordRepositoryInterface';

@injectable()
export default class ForgotPasswordService {
  constructor(
    @inject('ForgotPasswordRepository')
    private forgotPasswordRepository: ForgotPasswordRepositoryInterface,
  ) {}
}
