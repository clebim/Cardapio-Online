import { getConnection, Repository } from 'typeorm';
import ItemPhoto from '../../Entities/ItemPhoto';
import ItemPhotoRepositoryInterface from './ItemPhotoRepositoryInterface';
import connection from '../../../../Config/ConnectionDataBaseConfig';
import MenuPhotoInterface from '../Interfaces/MenuPhotoInterface';

export default class ItemPhotoRepository
  implements ItemPhotoRepositoryInterface {
  private ormRepository: Repository<ItemPhoto>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(ItemPhoto);
  }

  public async updatePhoto(itemPhoto: ItemPhoto): Promise<ItemPhoto> {
    await this.ormRepository.save(itemPhoto);

    return itemPhoto;
  }

  public async findPhotoByUserId(
    menuItemId: number,
  ): Promise<ItemPhoto | undefined> {
    const photo = await this.ormRepository.findOne({
      where: {
        menu_item_id: menuItemId,
      },
    });

    return photo;
  }

  public async createPhoto(data: MenuPhotoInterface): Promise<ItemPhoto> {
    const newPhoto = this.ormRepository.create({
      real_name: data.real_name,
      menu_item_id: data.menu_item_id,
      path: data.path,
    });

    await this.ormRepository.save(newPhoto);

    return newPhoto;
  }
}
