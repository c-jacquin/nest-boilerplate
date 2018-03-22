import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';

import { I18n } from '../../i18n';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(@Inject('I18n') private i18n: I18n) {}

  public catch(exception: HttpException, response: Response) {
    const statusCode = exception.getStatus();
    const { message } = exception.getResponse() as any;

    response.status(statusCode).json({
      message: this.i18n.translate('error.badRequest', {
        constraint: this.i18n.translate(`validation.${message.constraint}`),
        property: message.property,
      }),
      statusCode,
    });
  }
}
