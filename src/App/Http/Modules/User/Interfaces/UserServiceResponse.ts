import User from '../../../../Typeorm/Entities/User';

export default interface UserServiceResponse {
  success: boolean;
  message: string;
  user?: User | null;
  users?: User[] | null;
}
