import User from '../../Entities/User';
import HashForgotPassword from '../../Entities/HashForgotPassword';
import CreateHashInterface from '../Interfaces/CreateHashInterface';

export default interface ForgotPasswordRepositoryInterface {
  createHash(data: CreateHashInterface): Promise<HashForgotPassword>;
  verifyHashExists(hash: string): Promise<HashForgotPassword | undefined>;
  getUserByHash(hash: string): Promise<User>;
  revogedHash(hash: string): Promise<boolean>;
}
