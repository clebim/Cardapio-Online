import { Request, Response } from 'express';
import { container } from 'tsyringe';
import MenuItemService from './MenuItemService';

export default {
  async store(request: Request, response: Response): Promise<Response> {
    const {
      menu_section_id,
      item_name,
      price,
      description,
      observation,
    } = request.body;

    const { filename, originalname } = request.file;

    const menuItemService = container.resolve<MenuItemService>(MenuItemService);

    const responseService = await menuItemService.executeCreateItem(
      {
        menu_section_id,
        item_name,
        price,
        description,
        observation,
      },
      {
        path: filename,
        real_name: originalname,
      },
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(201).json(responseService);
  },

  async index(request: Request, response: Response): Promise<Response> {
    const menuItemService = container.resolve<MenuItemService>(MenuItemService);

    const responseService = await menuItemService.executeGetItems(
      request.userId,
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },
};
