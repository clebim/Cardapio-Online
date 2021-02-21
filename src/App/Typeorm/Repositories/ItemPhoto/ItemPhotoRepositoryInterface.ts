import MenuPhotoInterface from '../Interfaces/MenuPhotoInterface';
import ItemPhoto from '../../Entities/ItemPhoto';

export default interface ItemPhotoRepositoryInterface {
  createPhoto(data: MenuPhotoInterface): Promise<ItemPhoto>;
  updatePhoto(itemPhoto: ItemPhoto): Promise<ItemPhoto>;
  findPhotoByItemId(menuItemId: number): Promise<ItemPhoto | undefined>;
}
