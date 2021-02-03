import { Repository, getConnection } from 'typeorm';
import User from '../../Entities/User';
import connection from '../../../../Config/ConnectionDataBaseConfig';
import SessionRepositoryInterface from './Interfaces/SessionRepositoryInterface';

export default class SessionRepository implements SessionRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(User);
  }

  async verifyUserExists(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
      select: ['email', 'password', 'id'],
    });

    return user;
  }
}
