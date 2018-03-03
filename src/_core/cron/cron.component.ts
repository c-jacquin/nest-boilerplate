import { Component } from '@nestjs/common';
import { CronJob } from 'cron';

import { RegisterJobOptions } from './interfaces';

@Component()
export class CronService {
  private jobs = new Map<string, CronJob>();

  public getJob(name): CronJob {
    return this.jobs.get(name);
  }

  public registerJob({
    name,
    context,
    cronTime,
    onTick,
  }: RegisterJobOptions): CronJob {
    if (this.getJob(name)) {
      throw new Error('a cron with this name is already regstered');
    }
    const job = new CronJob({
      context,
      cronTime,
      onTick,
    });

    this.jobs.set(name, job);

    job.start();

    return job;
  }
}
