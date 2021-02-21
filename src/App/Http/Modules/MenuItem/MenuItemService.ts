import { inject, injectable } from 'tsyringe';
import { join } from 'path';
import fs from 'fs';
import MenuItem from '../../../Typeorm/Entities/MenuItem';
import ItemDataInterface from '../../../Typeorm/Repositories/Interfaces/ItemDataInterface';
import MenuItemRepository from '../../../Typeorm/Repositories/MenuItem/MenuItemRepository';
import { ItemPhotoMulterConfig } from '../../../../Config/Multer';
import MenuSectionRepositoryInterface from '../../../Typeorm/Repositories/MenuSection/MenuSectionRepositoryInterface';
import MenuItemServiceResponseInterface from './Interfaces/MenuItemServiceResponseInterface';
import { CreateMenuItemValidator } from '../../Validators/MenuItem/CreateMenuItemValidator';
import { UpdateMenuItemValidator } from '../../Validators/MenuItem/UpdateMenuItemValidator';
import ItemPhotoRepositoryInterface from '../../../Typeorm/Repositories/ItemPhoto/ItemPhotoRepositoryInterface';
import PhotoInterface from './Interfaces/PhotoInterface';

@injectable()
export default class MenuItemService {
  constructor(
    @inject('MenuSectionRepository')
    private menuSectionRepository: MenuSectionRepositoryInterface,
    @inject('MenuItemRepository')
    private menuItemRepository: MenuItemRepository,
    @inject('ItemPhotoRepository')
    private itemPhotoRepository: ItemPhotoRepositoryInterface,
  ) {}

  public async executeCreateItem(
    data: ItemDataInterface,
    photo: PhotoInterface,
  ): Promise<MenuItemServiceResponseInterface> {
    if (
      !CreateMenuItemValidator.isValidSync(data, {
        abortEarly: true,
      })
    ) {
      const errorMessage: string = await CreateMenuItemValidator.validate(
        data,
        {
          abortEarly: true,
        },
      ).catch(error => {
        return error.errors[0];
      });

      return {
        success: false,
        message: errorMessage,
        item: null,
      };
    }

    const newItem = await this.menuItemRepository.createItem(data);

    const newPhoto = await this.itemPhotoRepository.createPhoto({
      menu_item_id: newItem.id,
      path: photo.path,
      real_name: photo.real_name,
    });

    newPhoto.path = `${process.env.APP_URL}/files/item/${newPhoto.path}`;

    newItem.photo = newPhoto;

    return {
      success: false,
      message: 'Item criado com sucesso',
      item: newItem,
    };
  }

  public async executeGetItems(
    userId: number,
    isActive = true,
  ): Promise<MenuItemServiceResponseInterface> {
    if (userId === null) {
      return {
        success: false,
        message: 'Id do usuáio não enviado',
        items: null,
      };
    }

    const userItems = await this.menuSectionRepository.getUserItems(
      userId,
      isActive,
    );

    return {
      success: true,
      message: 'Busca realizada com sucesso',
      items: userItems,
    };
  }

  public async executeUpdateItem(
    id: number,
    data: ItemDataInterface,
  ): Promise<MenuItemServiceResponseInterface> {
    if (
      !UpdateMenuItemValidator.isValidSync(data, {
        abortEarly: true,
      })
    ) {
      const errorMessage: string = await UpdateMenuItemValidator.validate(
        data,
        {
          abortEarly: true,
        },
      ).catch(error => {
        return error.errors[0];
      });

      return {
        success: false,
        message: errorMessage,
        item: null,
      };
    }

    const item = (await this.menuItemRepository.findItemById(id)) as MenuItem;

    item.menu_section_id = data.menu_section_id;
    item.item_name = data.item_name;
    item.description = data.description;
    item.price = data.price;
    item.sold_off = data.sold_off as boolean;
    if (data.observation != null) {
      item.observation = data.observation;
    }

    await this.menuItemRepository.updateItem(item);

    return {
      success: true,
      message: 'Alterações realizadas com sucesso',
      item,
    };
  }

  public async executeDeleteItem(
    itemId: number,
  ): Promise<MenuItemServiceResponseInterface> {
    const item = (await this.menuItemRepository.findItemById(
      itemId,
    )) as MenuItem;

    const path = item.photo.path.split('item/');

    const itemPhotoFilePath = join(ItemPhotoMulterConfig.directory, path[1]);

    const userPhotoFileExists = await fs.promises.stat(itemPhotoFilePath);

    if (userPhotoFileExists) {
      await fs.promises.unlink(itemPhotoFilePath);
    }

    await this.menuItemRepository.deleteItem(itemId);

    return {
      success: true,
      message: 'Item deletado com sucesso',
      item: null,
    };
  }
}
