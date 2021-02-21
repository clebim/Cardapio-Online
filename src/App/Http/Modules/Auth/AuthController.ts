import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordDataInterface from './Interfaces/ResetPasswordDataInterface';
import SessionDataInterface from './Interfaces/SessionDataInterface';
import CreateSessionService from './Services/CreateSessionService';
import GetVerificationCodeService from './Services/GetVerificationCodeService';
import ResetPasswordService from './Services/ResetPasswordService';
import VerifyHashService from './Services/VerifyHashService';

export default {
  async createSession(request: Request, response: Response): Promise<Response> {
    const createSessionService = container.resolve<CreateSessionService>(
      CreateSessionService,
    );

    const responseService = await createSessionService.execute(
      request.body as SessionDataInterface,
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },

  async getVerificationCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const getVerificationCodeService = container.resolve<GetVerificationCodeService>(
      GetVerificationCodeService,
    );

    const responseService = await getVerificationCodeService.execute(email);

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },

  async verifyCode(request: Request, response: Response): Promise<Response> {
    const { hash } = request.body;

    const verifyHashService = container.resolve<VerifyHashService>(
      VerifyHashService,
    );

    const responseService = await verifyHashService.execute(hash);
    return response.status(200).json(responseService);
  },

  async resetPassword(request: Request, response: Response): Promise<Response> {
    const resetPasswordService = container.resolve<ResetPasswordService>(
      ResetPasswordService,
    );

    const responseService = await resetPasswordService.resetPassword(
      request.body as ResetPasswordDataInterface,
    );

    if (!responseService.success) {
      return response.status(400).json(responseService);
    }
    return response.status(200).json(responseService);
  },
};
