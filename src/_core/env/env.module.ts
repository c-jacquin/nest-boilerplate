import { Module } from '@nestjs/common';

import { Env } from './env.component';

@Module({
  components: [Env],
  exports: [Env],
})
export class EnvModule {}
