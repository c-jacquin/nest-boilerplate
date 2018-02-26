import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import { Env } from '../env';
import { Context } from './context.component';
import { ContextMiddleware } from './context.middleware';

@Module({
  components: [Context],
  exports: [Context],
  imports: [Env],
})
export class ContextModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(ContextMiddleware).forRoutes({ path: '*' });
  }
}
