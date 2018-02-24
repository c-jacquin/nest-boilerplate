import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { Context, ContextMiddleware } from './context';
import { DatabaseModule } from './database';
import { Env } from './env';
import { Http } from './http';
import { Logger, LoggerMiddleware } from './logger';

@Module({
  components: [Context, Env, Http, Logger],
  exports: [Context, Env, Http, Logger],
  imports: [DatabaseModule],
})
export class CoreModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(ContextMiddleware).forRoutes({ path: '*' });
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*' });
  }
}
