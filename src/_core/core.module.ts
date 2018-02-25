import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { Context, ContextMiddleware } from './context';
import { DatabaseModule } from './database';
import { Env } from './env';
import { BadRequestFilter, NotFoundFilter } from './error';
import { Http } from './http';
import { I18n, I18nMiddleware } from './i18n';
import { Logger, LoggerMiddleware } from './logger';

const moduleComponents = [
  BadRequestFilter,
  Context,
  Env,
  Http,
  I18n,
  Logger,
  NotFoundFilter,
];

@Module({
  components: moduleComponents,
  exports: moduleComponents,
  imports: [DatabaseModule],
})
export class CoreModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(ContextMiddleware).forRoutes({ path: '*' });
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*' });
    consumer.apply(I18nMiddleware).forRoutes({ path: '*' });
  }
}
