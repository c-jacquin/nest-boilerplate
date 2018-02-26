import { Module } from '@nestjs/common';

import { I18nModule } from '../i18n';
import { LoggerModule } from '../logger';

import { BadRequestFilter } from './badRequest.filter';
import { InternalErrorFilter } from './internalError.filter';
import { NotFoundFilter } from './notFound.filter';
import { ValidationPipe } from './validation.pipe';

@Module({
  components: [
    BadRequestFilter,
    InternalErrorFilter,
    NotFoundFilter,
    ValidationPipe,
  ],
  exports: [BadRequestFilter, NotFoundFilter],
  imports: [I18nModule, LoggerModule],
})
export class ExceptionModule {}
