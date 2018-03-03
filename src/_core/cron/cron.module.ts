import { Module } from '@nestjs/common';

import { CronService } from './cron.component';

@Module({
  components: [CronService],
  exports: [CronService],
})
export class CronModule {}
