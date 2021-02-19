import { Repository, getConnection } from 'typeorm';
import HashForgotPassword from '../../Entities/HashForgotPassword';
import CreateHashInterface from '../Interfaces/CreateHashInterface';
import ForgotPasswordRepositoryInterface from './ForgotPasswordRepositoryInterface';
import connection from '../../../../Config/ConnectionDataBaseConfig';
import User from '../../Entities/User';

export default class ForgotPasswordRepository
  implements ForgotPasswordRepositoryInterface {
  private ormRepository: Repository<HashForgotPassword>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(
      HashForgotPassword,
    );
  }

  async getUserByHash(hash: string): Promise<User> {
    const search = await this.ormRepository
      .createQueryBuilder('hash_forgot_password')
      .innerJoin('hash_forgot_password.user', 'user')
      .where('hash_forgot_password.hash = :hash', { hash })
      .select(['hash_forgot_password.id', 'user', 'user.password'])
      .getOne();

    const user = search?.user as User;
    return user;
  }

  async createHash(data: CreateHashInterface): Promise<HashForgotPassword> {
    const newHash = await this.ormRepository.create({
      hash: data.hash,
      user_id: data.user_id,
      expires_at: data.expires_at,
    });

    await this.ormRepository.save(newHash);

    return newHash;
  }

  async verifyHashExists(
    hash: string,
  ): Promise<HashForgotPassword | undefined> {
    const hashExists = await this.ormRepository.findOne({
      where: {
        hash,
        revoged: false,
      },
    });

    return hashExists;
  }

  async revogedHash(hash: string): Promise<boolean> {
    const hashExists = await this.ormRepository.findOne({
      where: {
        hash,
      },
    });

    if (!hashExists) {
      return false;
    }
    this.ormRepository.update(hashExists, {
      revoged: true,
    });
    return true;
  }
}
