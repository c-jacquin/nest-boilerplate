import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { ContextModule } from '../context';
import { EnvModule } from '../env';
import { i18nFactory } from './i18n.factory';
import { I18nMiddleware } from './i18n.middleware';

@Module({
  components: [i18nFactory],
  exports: [i18nFactory],
  imports: [ContextModule, EnvModule],
})
export class I18nModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(I18nMiddleware).forRoutes({ path: '*' });
  }
}
