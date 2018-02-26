import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { I18n } from '../i18n';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(private i18n: I18n) {}

  public catch(exception: HttpException, response) {
    const statusCode = exception.getStatus();
    const { error } = exception.getResponse() as any;

    const message = JSON.parse(error).reduce(
      (acc: string, validationError: ValidationError) => {
        return (
          acc +
          this.i18n.translate('error.badRequest', {
            constraint: this.i18n.translate(
              `validation.${Object.keys(validationError.constraints)[0]}`,
            ),
            property: validationError.property,
          })
        );
      },
      '',
    );
    response.status(statusCode).json({
      message,
      statusCode,
    });
  }
}
