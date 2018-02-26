import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { EnvModule } from '../env';
import { Logger } from './logger.component';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  components: [Logger],
  exports: [Logger],
  imports: [EnvModule],
})
export class LoggerModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*' });
  }
}
