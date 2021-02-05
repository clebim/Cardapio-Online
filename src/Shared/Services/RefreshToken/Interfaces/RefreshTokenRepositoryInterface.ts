import RefreshToken from '../../../App/Http/Entities/RefreshToken';
import TokenDataInterface from './TokenDataInterface';

export default interface RefreshTokenRepositoryInterface {
  createRefreshToken(data: TokenDataInterface): Promise<RefreshToken>;
  findTokenByToken(token: string): Promise<RefreshToken | undefined>;
  findTokenByUserId(user_id: number): Promise<RefreshToken | undefined>;
  deleteToken(token: string): Promise<boolean>;
}
