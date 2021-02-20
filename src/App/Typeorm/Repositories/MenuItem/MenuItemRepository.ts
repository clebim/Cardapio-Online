import { getConnection, Repository } from 'typeorm';
import ItemDataInterface from '../Interfaces/ItemDataInterface';
import MenuItemRepositoryInterface from './MenuItemRepositoryInterface';
import MenuItem from '../../Entities/MenuItem';
import connection from '../../../../Config/ConnectionDataBaseConfig';

export default class MenuItemRepository implements MenuItemRepositoryInterface {
  private ormRepository: Repository<MenuItem>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(MenuItem);
  }

  public async findItemById(itemId: number): Promise<MenuItem | undefined> {
    const item = this.ormRepository.findOne({
      relations: ['photo'],
      where: { id: itemId },
    });

    return item;
  }

  public async createItem(data: ItemDataInterface): Promise<MenuItem> {
    const newItem = this.ormRepository.create(data);

    await this.ormRepository.save(newItem);

    return newItem;
  }

  public async deleteItem(itemId: number): Promise<void> {
    await this.ormRepository.delete(itemId);
  }

  public async updateItem(menuItem: MenuItem): Promise<MenuItem> {
    await this.ormRepository.save(menuItem);

    return menuItem;
  }
}
