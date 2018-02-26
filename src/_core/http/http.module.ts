import { Module } from '@nestjs/common';

import { ContextModule } from '../context';
import { LoggerModule } from '../logger';
import { Http } from './http.component';

@Module({
  components: [Http],
  exports: [Http],
  imports: [ContextModule, LoggerModule],
})
export class HttpModule {}
