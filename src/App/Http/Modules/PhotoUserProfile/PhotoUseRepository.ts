import { getConnection, Repository } from 'typeorm';
import ProfilePhoto from '../../Entities/ProfilePhoto';
import PhotoUserRepositoryInterface from './Interfaces/PhotoUserRepositoryInterface';
import connection from '../../../../Config/ConnectionDataBaseConfig';
import CreatePhotoInterface from './Interfaces/CreatePhotoInterface';

export default class PhotoUserRepository
  implements PhotoUserRepositoryInterface {
  private ormRepository: Repository<ProfilePhoto>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(ProfilePhoto);
  }

  public async updatePhoto(profilePhoto: ProfilePhoto): Promise<ProfilePhoto> {
    await this.ormRepository.save(profilePhoto);

    return profilePhoto;
  }

  public async findPhotoByUserId(
    user_id: number,
  ): Promise<ProfilePhoto | undefined> {
    const photo = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return photo;
  }

  public async createPhoto(data: CreatePhotoInterface): Promise<ProfilePhoto> {
    const newPhoto = this.ormRepository.create({
      real_name: data.real_name,
      user_id: data.user_id,
      path: data.path,
    });

    await this.ormRepository.save(newPhoto);

    return newPhoto;
  }
}
