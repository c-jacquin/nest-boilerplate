import { Module } from '@nestjs/common';

import { I18nModule } from '../i18n';
import { LoggerModule } from '../logger';

import {
  BadRequestFilter,
  InternalErrorFilter,
  NotFoundFilter,
} from './filters';
import { ValidationPipe } from './pipes';

@Module({
  components: [
    BadRequestFilter,
    InternalErrorFilter,
    NotFoundFilter,
    ValidationPipe,
  ],
  exports: [
    BadRequestFilter,
    InternalErrorFilter,
    NotFoundFilter,
    ValidationPipe,
  ],
  imports: [I18nModule, LoggerModule],
})
export class ExceptionModule {}
