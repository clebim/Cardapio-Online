import { inject, injectable } from 'tsyringe';
import { join } from 'path';
import fs from 'fs';
import ItemPhotoRepositoryInterface from '../../../../Typeorm/Repositories/ItemPhoto/ItemPhotoRepositoryInterface';
import ItemPhoto from '../../../../Typeorm/Entities/ItemPhoto';
import { ItemPhotoMulterConfig } from '../../../../../Config/Multer';
import CreatePhotoResponse from '../../User/Interfaces/CreatePhotoResponse';
import EditPhotoItemInterface from '../Interfaces/EditPhotoItemInterface';

@injectable()
export default class UpdateItemPhotoService {
  constructor(
    @inject('ItemPhotoRepository')
    private itemPhotoRepository: ItemPhotoRepositoryInterface,
  ) {}

  public async execute(
    data: EditPhotoItemInterface,
  ): Promise<CreatePhotoResponse> {
    const itemPhoto = (await this.itemPhotoRepository.findPhotoByItemId(
      data.item_id,
    )) as ItemPhoto;

    const path = itemPhoto.path.split('item/');

    const itemPhotoFilePath = join(ItemPhotoMulterConfig.directory, path[1]);

    const userPhotoFileExists = await fs.promises.stat(itemPhotoFilePath);

    if (userPhotoFileExists) {
      await fs.promises.unlink(itemPhotoFilePath);
    }

    itemPhoto.path = data.path;
    itemPhoto.real_name = data.real_name;

    await this.itemPhotoRepository.updatePhoto(itemPhoto);

    return {
      success: true,
      message: 'Foto de perfil alterada com sucesso',
      path: `${process.env.APP_URL}/files/item/${itemPhoto.path}`,
    };
  }
}
