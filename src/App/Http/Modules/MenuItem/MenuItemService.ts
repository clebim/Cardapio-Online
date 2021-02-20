import { inject, injectable } from 'tsyringe';
import ItemDataInterface from '../../../Typeorm/Repositories/Interfaces/ItemDataInterface';
import MenuItemRepository from '../../../Typeorm/Repositories/MenuItem/MenuItemRepository';
import MenuSectionRepositoryInterface from '../../../Typeorm/Repositories/MenuSection/MenuSectionRepositoryInterface';
import MenuItemServiceResponseInterface from './Interfaces/MenuItemServiceResponseInterface';
import { CreateMenuItemValidator } from '../../Validators/MenuItem/CreateMenuItemValidator';
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

  // public async executeUpdateItem(): Promise<MenuItemServiceResponseInterface> {}

  // public async executeUpdatePhotoItem(): Promise<MenuItemServiceResponseInterface> {}

  // public async executeDeleteItem(): Promise<MenuItemServiceResponseInterface> {}
}
