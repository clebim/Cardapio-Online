import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ChangeIsActiveService from './Services/ChangeIsActiveService';
import CreateSectionMenuService from './Services/CreateSectionService';
import DeleteSectionMenuService from './Services/DeleteSectionService';

export default {
  async store(request: Request, response: Response): Promise<Response> {
    const createSectionService = container.resolve<CreateSectionMenuService>(
      CreateSectionMenuService,
    );

    const { userId } = request;
    const { section_name } = request.body;

    const responseService = await createSectionService.execute(
      userId,
      section_name,
    );

    return response.status(200).json(responseService);
  },

  async changeIsActive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const sectionMenuService = container.resolve<ChangeIsActiveService>(
      ChangeIsActiveService,
    );
    const { id } = request.params;

    const responseService = await sectionMenuService.execute(parseInt(id));

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const sectionMenuService = container.resolve<DeleteSectionMenuService>(
      DeleteSectionMenuService,
    );

    const { userId } = request;
    const { id } = request.params;

    const responseService = await sectionMenuService.execute({
      id: parseInt(id),
      userId,
    });

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },
};
