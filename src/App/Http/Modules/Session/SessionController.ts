import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SessionDataInterface from './Interfaces/SessionDataInterface';
import SessionService from './SessionService';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const sessionService = container.resolve<SessionService>(SessionService);

    const responseService = await sessionService.executeLogin(
      request.body as SessionDataInterface,
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },
};
