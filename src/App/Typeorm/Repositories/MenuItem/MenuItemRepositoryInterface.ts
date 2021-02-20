import MenuItem from '../../Entities/MenuItem';
import ItemDataInterface from '../Interfaces/ItemDataInterface';

export default interface MenuItemRepositoryInterface {
  findItemById(itemId: number): Promise<MenuItem | undefined>;
  createItem(data: ItemDataInterface): Promise<MenuItem>;
  deleteItem(itemId: number): Promise<void>;
  updateItem(menuItem: MenuItem): Promise<MenuItem>;
}
