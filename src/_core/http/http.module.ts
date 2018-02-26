import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger';
import { Http } from './http.component';

@Module({
  components: [Http],
  exports: [Http],
  imports: [LoggerModule],
})
export class HttpModule {}
