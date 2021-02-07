import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ForgotPasswordService from './ForgotPasswordService';
import ResetPasswordDataInterface from './Interfaces/ResetPasswordDataInterface';

export default {
  async getVerificationCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordService = container.resolve<ForgotPasswordService>(
      ForgotPasswordService,
    );

    const responseService = await forgotPasswordService.getHashForgotPassword(
      email,
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },

  async verifyCode(request: Request, response: Response): Promise<Response> {
    const { hash } = request.body;

    const forgotPasswordService = container.resolve<ForgotPasswordService>(
      ForgotPasswordService,
    );

    const responseService = await forgotPasswordService.verifyCode(hash);
    return response.status(200).json(responseService);
  },

  async resetPassword(request: Request, response: Response): Promise<Response> {
    const forgotPasswordService = container.resolve<ForgotPasswordService>(
      ForgotPasswordService,
    );

    const responseService = await forgotPasswordService.resetPassword(
      request.body as ResetPasswordDataInterface,
    );

    if (!responseService.success) {
      return response.status(400).json(responseService);
    }
    return response.status(200).json(responseService);
  },
};
