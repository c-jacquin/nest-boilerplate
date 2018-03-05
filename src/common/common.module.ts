import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { Context, ContextMiddleware } from './context';
import { CronService } from './cron';
import { Env } from './env';
import {
  BadRequestFilter,
  InternalErrorFilter,
  NotFoundFilter,
  ValidationPipe,
} from './exception';
import { Http } from './http';
import { i18nFactory, I18nMiddleware } from './i18n';
import { Logger, LoggerMiddleware } from './logger';

const commonComponents = [
  BadRequestFilter,
  InternalErrorFilter,
  NotFoundFilter,
  ValidationPipe,
  Context,
  CronService,
  Env,
  Http,
  i18nFactory,
  Logger,
];

@Module({
  components: commonComponents,
  exports: commonComponents,
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(I18nMiddleware).forRoutes({ path: '*' });
    consumer.apply(ContextMiddleware).forRoutes({ path: '*' });
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*' });
  }
}
