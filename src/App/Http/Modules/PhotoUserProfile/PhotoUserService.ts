import { injectable, inject } from 'tsyringe';
import { join } from 'path';
import fs from 'fs';
import Multer from '../../../../Config/Multer';
import CreatePhotoResponse from './Interfaces/CreatePhotoResponse';
import ProfilePhotoRepositoryInterface from '../../../Typeorm/Repositories/ProfilePhoto/ProfilePhotoRepositoryInterface';
import RequestImageInterface from './Interfaces/RequestImageInterface';

@injectable()
export default class PhotoUserService {
  constructor(
    @inject('ProfilePhoto')
    private ormRepository: ProfilePhotoRepositoryInterface,
  ) {}

  public async executeCreateProfilePhoto(
    data: RequestImageInterface,
  ): Promise<CreatePhotoResponse> {
    const photo = await this.ormRepository.findPhotoByUserId(data.userId);
    if (!photo) {
      const newPhoto = await this.ormRepository.createPhoto({
        path: data.fileName,
        real_name: data.originalName,
        user_id: data.userId,
      });

      return {
        success: true,
        message: 'Imagem cadastrada com sucesso',
        path: newPhoto.path,
      };
    }

    const path = photo.path.split('files/');

    const userPhotoFilePath = join(Multer.directory, path[1]);

    const userPhotoFileExists = await fs.promises.stat(userPhotoFilePath);

    if (userPhotoFileExists) {
      await fs.promises.unlink(userPhotoFilePath);
    }

    photo.path = data.fileName;
    photo.real_name = data.originalName;

    await this.ormRepository.updatePhoto(photo);

    return {
      success: true,
      message: 'Foto de perfil alterada com sucesso',
      path: photo.path,
    };
  }
}
