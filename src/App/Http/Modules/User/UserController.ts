import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserData from '../../../Typeorm/Repositories/Interfaces/UserDataInterface';
import UserService from './UserService';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve<UserService>(UserService);

    const responseService = await userService.executeCreateUser(
      request.body as UserData,
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }
    return response.status(200).json(responseService);
  },
};
