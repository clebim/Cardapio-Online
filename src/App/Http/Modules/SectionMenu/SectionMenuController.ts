import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SectionMenuService from './SectionMenuService';

export default {
  async store(request: Request, response: Response): Promise<Response> {
    const sectionMenuService = container.resolve<SectionMenuService>(
      SectionMenuService,
    );

    const { userId } = request;
    const { section_name } = request.body;

    const responseService = await sectionMenuService.executeCreateSection(
      userId,
      section_name,
    );

    return response.status(200).json(responseService);
  },

  async changeIsActive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const sectionMenuService = container.resolve<SectionMenuService>(
      SectionMenuService,
    );

    const { userId } = request;
    const { id } = request.params;
    const { is_active } = request.body;

    const responseService = await sectionMenuService.executeChangeActive({
      id: parseInt(id),
      userId,
      isActive: is_active,
    });

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const sectionMenuService = container.resolve<SectionMenuService>(
      SectionMenuService,
    );

    const { userId } = request;
    const { id } = request.params;

    const responseService = await sectionMenuService.executeDeleteSection({
      id: parseInt(id),
      userId,
    });

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },
};
