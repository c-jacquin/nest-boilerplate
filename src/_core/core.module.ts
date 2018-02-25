import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { Context, ContextMiddleware } from './context';
import { DatabaseModule } from './database';
import { Env } from './env';
import { Http } from './http';
import { I18n, I18nMiddleware } from './i18n';
import { Logger, LoggerMiddleware } from './logger';

@Module({
  components: [Context, Env, Http, I18n, Logger],
  exports: [Context, Env, Http, I18n, Logger],
  imports: [DatabaseModule],
})
export class CoreModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(ContextMiddleware).forRoutes({ path: '*' });
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*' });
    consumer.apply(I18nMiddleware).forRoutes({ path: '*' });
  }
}
