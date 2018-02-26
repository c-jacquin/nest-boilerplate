import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { ContextModule } from '../context';
import { Env, EnvModule } from '../env';
import { Logger } from './logger.component';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  components: [Logger],
  exports: [Logger],
  imports: [ContextModule, EnvModule],
})
export class LoggerModule implements NestModule {
  constructor(private env: Env) {}
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*' });
  }
}
