import UserData from '../Interfaces/UserDataInterface';
import User from '../../Entities/User';

export default interface UserRepositoryInterface {
  findOneByEmail(email: string): Promise<User | undefined>;
  findOneById(id: number): Promise<User>;
  createUser(data: UserData): Promise<User>;
  resetPassword(user: User, password: string): Promise<boolean>;
  getUsersByName(name: string): Promise<User[]>;
  getUserWithPassword(email: string): Promise<User | undefined>;
}
