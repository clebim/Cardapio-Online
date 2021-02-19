import { inject, injectable } from 'tsyringe';
import UserServiceResponse from './Interfaces/UserServiceResponse';
import { userSchemaValidator } from '../../Validators/User/CreateUserValidator';
import UserData from '../../../Typeorm/Repositories/Interfaces/UserDataInterface';
import UserRepositoryInterface from '../../../Typeorm/Repositories/User/UserRepositoryInterface';

@injectable()
export default class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async executeCreateUser(data: UserData): Promise<UserServiceResponse> {
    // make the necessary validations;
    if (
      !userSchemaValidator.isValidSync(data, {
        abortEarly: true,
      })
    ) {
      const errorMessage: string = await userSchemaValidator
        .validate(data, {
          abortEarly: true,
        })
        .catch(error => {
          return error.errors[0];
        });

      return {
        success: false,
        message: errorMessage,
        user: null,
      };
    }

    const { password, confirmation_password } = data;

    if (password !== confirmation_password) {
      return {
        success: false,
        message: 'Senha e confirmação de senha não podem ser diferentes',
        user: null,
      };
    }

    const userExists = await this.userRepository.findOneByEmail(data.email);

    if (userExists) {
      return {
        success: false,
        message: 'Já existe um restautante cadastrado com este email',
        user: null,
      };
    }

    const newUser = await this.userRepository.createUser(data);

    return {
      success: true,
      message: 'Usuário criado com sucesso',
      user: {
        id: newUser.id,
        restaurante_name: newUser.restaurant_name,
      },
    };
  }
}
