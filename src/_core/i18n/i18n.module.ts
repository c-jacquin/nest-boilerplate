import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { ContextModule } from '../context';
import { EnvModule } from '../env';
import { I18n } from './i18n.component';
import { I18nMiddleware } from './i18n.middleware';

@Module({
  components: [I18n],
  exports: [I18n],
  imports: [ContextModule, EnvModule],
})
export class I18nModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(I18nMiddleware).forRoutes({ path: '*' });
  }
}
