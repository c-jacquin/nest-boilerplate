import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as yenv from 'yenv';

import { Env } from './_core/env.component';
import { Logger } from './_core/logger.component';
import { RequestIdMiddleware } from './_core/requestId.middleware';
import { RequestLoggerMiddleware } from './_core/requestLogger.middleware';
import { AppController } from './app.controller';

const env = yenv();

@Module({
  components: [Env, Logger],
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
    consumer.apply(RequestIdMiddleware).forRoutes(AppController);
    consumer.apply(RequestLoggerMiddleware).forRoutes(AppController);
  }
}
