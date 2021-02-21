import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserData from '../../../Typeorm/Repositories/Interfaces/UserDataInterface';
import CreateUserService from './Services/CreateUserService';
import PhotoUserService from './Services/PhotoUserService';
import FindUsersByNameService from './Services/FindUsersByNameService';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve<CreateUserService>(
      CreateUserService,
    );

    const responseService = await createUserService.execute(
      request.body as UserData,
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }
    return response.status(200).json(responseService);
  },

  async storePhotoUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const photoUserService = container.resolve<PhotoUserService>(
      PhotoUserService,
    );

    const responseService = await photoUserService.execute({
      userId: request.userId,
      fileName: request.file.filename,
      originalName: request.file.originalname,
    });

    return response.status(200).json(responseService);
  },

  async indexByName(request: Request, response: Response): Promise<Response> {
    const findUsersByNameService = container.resolve<FindUsersByNameService>(
      FindUsersByNameService,
    );

    const { name } = request.body;

    const responseService = await findUsersByNameService.execute(name);

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }
    return response.status(200).json(responseService);
  },
};
