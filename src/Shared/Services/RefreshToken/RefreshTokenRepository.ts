import { getConnection, Repository } from 'typeorm';
import RefreshToken from '../../../App/Typeorm/Entities/RefreshToken';
import connection from '../../../Config/ConnectionDataBaseConfig';
import RefreshTokenRepositoryInterface from './Interfaces/RefreshTokenRepositoryInterface';
import TokenDataInterface from './Interfaces/TokenDataInterface';

export default class RefreshTokenRepository
  implements RefreshTokenRepositoryInterface {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository<RefreshToken>(
      RefreshToken,
    );
  }

  async findTokenByUserId(user_id: number): Promise<RefreshToken | undefined> {
    const refreshToken = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return refreshToken;
  }

  async createRefreshToken(data: TokenDataInterface): Promise<RefreshToken> {
    const refreshToken = this.ormRepository.create({
      user_id: data.user_id,
      token: data.token,
      expires_at: data.expires_at,
    });

    await this.ormRepository.save(refreshToken);

    return refreshToken;
  }

  async findTokenByToken(token: string): Promise<RefreshToken | undefined> {
    const refreshToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return refreshToken;
  }

  async deleteToken(token: string): Promise<boolean> {
    const refreshToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    if (!refreshToken) {
      return false;
    }
    await this.ormRepository.delete(refreshToken);
    return true;
  }
}
