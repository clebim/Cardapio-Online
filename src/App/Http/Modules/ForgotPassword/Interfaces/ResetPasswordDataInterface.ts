export default interface ResetPasswordDataInterface {
  hash: string;
  old_password: string;
  password: string;
  confirmation_password: string;
}
