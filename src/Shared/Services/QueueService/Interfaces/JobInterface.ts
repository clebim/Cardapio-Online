/* eslint-disable @typescript-eslint/no-explicit-any */
import { Job } from 'bee-queue';

export default interface JobInterface {
  key: string;
  handle(job: Job<any>): Promise<void>;
}
