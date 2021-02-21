import { inject, injectable } from 'tsyringe';
import UserServiceResponse from '../Interfaces/UserServiceResponse';
import UserRepositoryInterface from '../../../../Typeorm/Repositories/User/UserRepositoryInterface';

@injectable()
export default class FindUsersByNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute(name: string): Promise<UserServiceResponse> {
    if (name == null || name.length == 0) {
      return {
        success: false,
        message: 'Informar um nome é obrigatório',
        users: null,
      };
    }

    const users = await this.userRepository.getUsersByName(name);

    return {
      success: true,
      message: 'Restaurantes encontrados com sucesso',
      users,
    };
  }
}
