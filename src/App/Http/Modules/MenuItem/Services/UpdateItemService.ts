import { inject, injectable } from 'tsyringe';
import MenuItem from '../../../../Typeorm/Entities/MenuItem';
import ItemDataInterface from '../../../../Typeorm/Repositories/Interfaces/ItemDataInterface';
import MenuItemRepository from '../../../../Typeorm/Repositories/MenuItem/MenuItemRepository';
import MenuItemServiceResponseInterface from '../Interfaces/MenuItemServiceResponseInterface';
import { UpdateMenuItemValidator } from '../../../Validators/MenuItem/UpdateMenuItemValidator';

@injectable()
export default class UpdateItemService {
  constructor(
    @inject('MenuItemRepository')
    private menuItemRepository: MenuItemRepository,
  ) {}

  public async execute(
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
}
