import ProfilePhoto from '../../Entities/ProfilePhoto';
import CreatePhotoInterface from '../Interfaces/CreatePhotoInterface';

export default interface PhotoUserRepositoryInterface {
  createPhoto(data: CreatePhotoInterface): Promise<ProfilePhoto>;
  updatePhoto(profilePhoto: ProfilePhoto): Promise<ProfilePhoto>;
  findPhotoByUserId(user_id: number): Promise<ProfilePhoto | undefined>;
}
