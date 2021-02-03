import { getConnection, Repository } from 'typeorm';
import User from '../../Entities/User';

import UserRepositoryInterface from './Interfaces/UserRepositoryInterface';
import UserData from './Interfaces/UserDataInterface';
import connection from '../../../../Config/ConnectionDataBaseConfig';

export default class UserRepository implements UserRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(User);
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async createUser(data: UserData): Promise<User> {
    const user = this.ormRepository.create({
      email: data.email,
      password: data.password,
      city: data.city,
      phone: data.phone,
      neighborhood: data.neighborhood,
      restaurant_name: data.restaurant_name,
      number: data.number,
      street: data.street,
      zip_code: data.zip_code,
    });

    await this.ormRepository.save(user);

    return user;
  }
}
