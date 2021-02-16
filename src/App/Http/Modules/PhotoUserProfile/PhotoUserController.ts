import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PhotoUserService from './PhotoUserService';

export default {
  async store(request: Request, response: Response): Promise<Response> {
    const photoUserService = container.resolve<PhotoUserService>(
      PhotoUserService,
    );

    const responseService = await photoUserService.executeCreateProfilePhoto({
      userId: request.userId,
      fileName: request.file.filename,
      originalName: request.file.originalname,
    });

    return response.status(200).json(responseService);
  },
};
