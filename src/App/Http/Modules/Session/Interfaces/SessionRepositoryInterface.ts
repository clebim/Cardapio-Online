import User from '@Entities/User';

export default interface SessionRepositoryInterface {
  verifyUserExists(email: string): Promise<User | undefined>;
}
