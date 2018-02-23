import { Module } from '@nestjs/common';

import { Env } from './env.component';

@Module({
  exports: [Env],
})
export class CoreModule {}
