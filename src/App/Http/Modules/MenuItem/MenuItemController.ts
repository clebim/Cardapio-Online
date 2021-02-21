import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateItemService from './Services/CreateItemService';
import DeleteItemService from './Services/DeleteItemService';
import GetAllItemsSercice from './Services/GetAllItemsService';
import GetUserItems from './Services/GetItemsService';
import ItemPhotoService from './Services/UpdateItemPhotoService';
import UpdateItemService from './Services/UpdateItemService';

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

    const createItemService = container.resolve<CreateItemService>(
      CreateItemService,
    );

    const responseService = await createItemService.execute(
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
    const getAllItemsService = container.resolve<GetAllItemsSercice>(
      GetAllItemsSercice,
    );

    const responseService = await getAllItemsService.execute(request.userId);

    if (responseService.success === false) {
      return response.status(400).json(responseService);
    }

    return response.status(200).json(responseService);
  },

  async getUserItems(request: Request, response: Response): Promise<Response> {
    const getUserItems = container.resolve<GetUserItems>(GetUserItems);

    const { id } = request.params;

    const responseService = await getUserItems.execute(parseInt(id));

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

    const updateItemService = container.resolve<UpdateItemService>(
      UpdateItemService,
    );

    const responseService = await updateItemService.execute(parseInt(item_id), {
      menu_section_id,
      item_name,
      price,
      description,
      observation,
      sold_off,
    });

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
    const responseService = await itemPhotoService.execute({
      item_id,
      path: request.file.filename,
      real_name: request.file.originalname,
    });

    return response.status(200).json(responseService);
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteItemService = container.resolve<DeleteItemService>(
      DeleteItemService,
    );

    const item_id = request.params.id;
    const responseService = await deleteItemService.execute(parseInt(item_id));

    return response.status(200).json(responseService);
  },
};
