import { Request, Response } from 'express';
import { container } from 'tsyringe';
import MenuItemService from './MenuItemService';
import ItemPhotoService from './ItemPhotoService';

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

  async update(request: Request, response: Response): Promise<Response> {
    const {
      menu_section_id,
      item_name,
      price,
      description,
      observation,
      sold_off,
    } = request.body;

    const item_id = request.params.id;

    const menuItemService = container.resolve<MenuItemService>(MenuItemService);

    const responseService = await menuItemService.executeUpdateItem(
      parseInt(item_id),
      {
        menu_section_id,
        item_name,
        price,
        description,
        observation,
        sold_off,
      },
    );

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },

  async updateItemPhoto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const itemPhotoService = container.resolve<ItemPhotoService>(
      ItemPhotoService,
    );

    const item_id = parseInt(request.params.id);
    const responseService = await itemPhotoService.executeUpdatePhotoItem({
      item_id,
      path: request.file.filename,
      real_name: request.file.originalname,
    });

    return response.status(200).json(responseService);
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const menuItemService = container.resolve<MenuItemService>(MenuItemService);

    const item_id = request.params.id;
    const responseService = await menuItemService.executeDeleteItem(
      parseInt(item_id),
    );

    return response.status(200).json(responseService);
  },
};
