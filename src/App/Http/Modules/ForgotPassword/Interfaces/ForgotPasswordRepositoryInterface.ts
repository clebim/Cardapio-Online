import HashForgotPassword from '../../../Entities/HashForgotPassword';
import User from '../../../Entities/User';
import CreateHashInterface from './CreateHashInterface';

export default interface ForgotPasswordRepositoryInterface {
  findUser(email: string): Promise<User | undefined>;
  createHash(data: CreateHashInterface): Promise<HashForgotPassword>;
  verifyHashExists(hash: string): Promise<HashForgotPassword | undefined>;
  revogedHash(hash: string): Promise<boolean>;
}
