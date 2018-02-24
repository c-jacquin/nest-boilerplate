import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as yenv from 'yenv';

import { Context } from './_core/context.component';
import { ContextMiddleware } from './_core/context.middleware';
import { Env } from './_core/env.component';
import { Http } from './_core/http.component';
import { Logger } from './_core/logger.component';
import { RequestLoggerMiddleware } from './_core/requestLogger.middleware';
import { AppController } from './app.controller';

const env = yenv();

@Module({
  components: [Context, Env, Http, Logger],
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      entities: [path.join(process.cwd(), env.TYPEORM_ENTITIES)],
      logging: env.TYPEORM_LOGGING,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      type: env.TYPEORM_CONNECTION,
      url: env.TYPEORM_URL,
    }),
  ],
})
export class ApplicationModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(ContextMiddleware).forRoutes({ path: '*' });
    consumer.apply(RequestLoggerMiddleware).forRoutes({ path: '*' });
  }
}
