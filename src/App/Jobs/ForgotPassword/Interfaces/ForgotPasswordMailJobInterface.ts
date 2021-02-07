import { Job } from 'bee-queue';
import { DataHandleInterface } from './ForgotPasswordDataInterface';

export default interface ForgotPasswordMailJobInterface {
  key: string;
  handle(teste: Job<DataHandleInterface>): Promise<void>;
}
