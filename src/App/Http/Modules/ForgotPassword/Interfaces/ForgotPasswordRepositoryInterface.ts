import HashForgotPassword from '../../../Entities/HashForgotPassword';
import User from '../../../Entities/User';
import CreateHashInterface from './CreateHashInterface';

export default interface ForgotPasswordRepositoryInterface {
  findUser(email: string): Promise<User | undefined>;
  createHash(data: CreateHashInterface): Promise<HashForgotPassword>;
  verifyHashExists(hash: string): Promise<HashForgotPassword | undefined>;
  getUserByHash(hash: string): Promise<User>;
  resetPassword(user: User, password: string): Promise<boolean>;
  revogedHash(hash: string): Promise<boolean>;
}
