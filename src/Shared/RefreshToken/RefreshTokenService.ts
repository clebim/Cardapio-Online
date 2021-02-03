import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import { addDays, differenceInHours } from 'date-fns';
import RefreshTokenInterface from './Interfaces/RefreshTokenRepositoryInterface';
import RefreshTokenResponse from './Interfaces/RefreshTokenResponse';

@injectable()
export default class RefreshTokenService {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: RefreshTokenInterface,
  ) {}

  async createRefreshToken(user_id: number): Promise<string> {
    const refreshTokenExists = await this.refreshTokenRepository.findTokenByUserId(
      user_id,
    );

    if (refreshTokenExists) {
      await this.refreshTokenRepository.deleteToken(refreshTokenExists.token);
    }

    const token = `${crypto
      .randomBytes(32)
      .toString('hex')}-${user_id}-${crypto.randomBytes(32).toString('hex')}`;
    const expires_at = addDays(Date.now(), 5);

    const refreshToken = await this.refreshTokenRepository.createRefreshToken({
      token,
      user_id,
      expires_at,
    });

    return refreshToken.token;
  }

  async tokenIsValid(
    token: string,
    user_id: number,
  ): Promise<RefreshTokenResponse> {
    const refreshToken = await this.refreshTokenRepository.findTokenByToken(
      token,
    );

    if (!refreshToken) {
      return {
        success: false,
        message: 'Token inválido',
      };
    }

    if (refreshToken.user_id !== user_id) {
      return {
        success: false,
        message: 'Token não pertence ao usuário',
      };
    }

    const difference = differenceInHours(refreshToken.expires_at, Date.now());

    if (difference < 0) {
      return {
        success: false,
        message: 'refresh token expirado',
      };
    }

    return {
      success: true,
      message: 'token válido',
    };
  }

  async invalidateToken(token: string): Promise<boolean> {
    const response = await this.refreshTokenRepository.deleteToken(token);

    return response;
  }
}
