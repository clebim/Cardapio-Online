import { Repository, getConnection } from 'typeorm';
import HashForgotPassword from '../../Entities/HashForgotPassword';
import User from '../../Entities/User';
import CreateHashInterface from './Interfaces/CreateHashInterface';
import ForgotPasswordRepositoryInterface from './Interfaces/ForgotPasswordRepositoryInterface';
import connection from '../../../../Config/ConnectionDataBaseConfig';

export default class ForgotPasswordRepository
  implements ForgotPasswordRepositoryInterface {
  private ormRepository: Repository<HashForgotPassword>;

  private ormUserRepository: Repository<User>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(
      HashForgotPassword,
    );
    this.ormUserRepository = getConnection(connection).getRepository(User);
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.ormUserRepository.findOne({
      where: { email },
    });

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
