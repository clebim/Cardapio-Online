interface UserService {
  id: number;
  restaurante_name: string;
}

export default interface UserServiceResponse {
  success: boolean;
  message: string;
  user: UserService | null;
}
