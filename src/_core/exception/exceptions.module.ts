import { Module } from '@nestjs/common';

import { I18nModule } from '../i18n';
import { BadRequestFilter } from './badRequest.filter';
import { NotFoundFilter } from './notFound.filter';
import { ValidationPipe } from './validation.pipe';

@Module({
  components: [BadRequestFilter, NotFoundFilter, ValidationPipe],
  exports: [BadRequestFilter, NotFoundFilter],
  imports: [I18nModule],
})
export class ExceptionModule {}
