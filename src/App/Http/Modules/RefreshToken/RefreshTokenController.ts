import { Request, Response } from 'express';
import { container } from 'tsyringe';
import jwt from 'jsonwebtoken';
import authConfig from '../../../../Config/AuthConfig';
import RefreshTokenService from '../../../../Shared/RefreshToken/RefreshTokenService';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const refreshTokenService = container.resolve<RefreshTokenService>(
      RefreshTokenService,
    );

    const token = request.body.refresh_token as string;
    const splited = request.body.refresh_token.split('-');
    const id = splited[1];

    const isValid = await refreshTokenService.tokenIsValid(token, id);

    if (!isValid.success) {
      return response.status(401).json({
        success: false,
        message: isValid.message,
        tokens: null,
      });
    }

    const invalidateToken = await refreshTokenService.invalidateToken(token);

    if (!invalidateToken) {
      return response.status(200).json({
        success: false,
        message: 'Erro desconhecido ao gerar token, faça login',
        tokens: null,
      });
    }

    const newRefreshtoken = await refreshTokenService.createRefreshToken(id);

    return response.status(200).json({
      success: true,
      message: 'Novos tokens gerados com sucesso',
      tokens: {
        access_token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
        refresh_token: newRefreshtoken,
      },
    });
  },
};
