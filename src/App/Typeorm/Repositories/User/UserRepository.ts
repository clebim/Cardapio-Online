import { getConnection, Repository } from 'typeorm';
import User from '../../Entities/User';
import UserRepositoryInterface from './UserRepositoryInterface';

import UserData from '../Interfaces/UserDataInterface';
import connection from '../../../../Config/ConnectionDataBaseConfig';

export default class UserRepository implements UserRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(User);
  }

  public async getUserWithPassword(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      relations: ['photo'],
      where: { email },
      select: ['id', 'password', 'email'],
    });
    return user;
  }

  public async getUsersByName(name: string): Promise<User[]> {
    const users = await this.ormRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.photo', 'photo')
      .where('users.restaurant_name ILIKe :name', { name: `%${name}%` })
      .getMany();

    return users;
  }

  public async findOneById(id: number): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });
    return user as User;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      relations: ['photo'],
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

  public async resetPassword(user: User, password: string): Promise<boolean> {
    try {
      user.password = password;

      await this.ormRepository.update(user.id, user);

      return true;
    } catch (error) {
      return false;
    }
  }
}
