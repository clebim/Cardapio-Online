import User from '../../../../Typeorm/Entities/User';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export default interface SessionServiceResponseInterface {
  success: boolean;
  message: string;
  tokens: Tokens | null;
  user?: User;
}
