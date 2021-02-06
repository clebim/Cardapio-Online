/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Bee from 'bee-queue';
import redisConfig from '../../../Config/Redis';
import JobInterface from './Interfaces/JobInterface';
import Jobs from '../../../App/Http/Jobs';

class QueueService {
  jobs: any = [];

  queues: any;

  constructor() {
    this.queues = {};

    this.jobs = Jobs;

    this.init();
  }

  init(): void {
    this.jobs.forEach(({ key, handle }: JobInterface) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue: string, job: any): void {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue(): void {
    this.jobs.forEach((job: any) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job: any, err: any) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new QueueService();
