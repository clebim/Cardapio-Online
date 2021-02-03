/* eslint-disable radix */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../../../Config/AuthConfig';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | NextFunction {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.json({
      success: false,
      message: 'Token JWT é obrigatório',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.userId = parseInt(sub);

    return next;
  } catch {
    return response.json({
      success: false,
      message: 'Token JWT é inválido',
    });
  }
}
