import { Module } from '@nestjs/common';

import {
  ContextModule,
  DatabaseModule,
  EnvModule,
  ExceptionModule,
  HttpModule,
  I18nModule,
  LoggerModule,
} from './_core';

import { AuthModule } from './auth';
import { UserModule } from './user';

@Module({
  imports: [
    AuthModule,
    ContextModule,
    DatabaseModule,
    EnvModule,
    ExceptionModule,
    HttpModule,
    I18nModule,
    LoggerModule,
    UserModule,
  ],
})
export class ApplicationModule {}
