import { inject, injectable } from 'tsyringe';
import { join } from 'path';
import fs from 'fs';
import MenuItem from '../../../../Typeorm/Entities/MenuItem';
import MenuItemRepository from '../../../../Typeorm/Repositories/MenuItem/MenuItemRepository';
import { ItemPhotoMulterConfig } from '../../../../../Config/Multer';
import MenuItemServiceResponseInterface from '../Interfaces/MenuItemServiceResponseInterface';

@injectable()
export default class DeleteItemService {
  constructor(
    @inject('MenuItemRepository')
    private menuItemRepository: MenuItemRepository,
  ) {}

  public async execute(
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
