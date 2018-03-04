import {
  Catch,
  ExceptionFilter,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import { I18n } from '../../i18n';
import { Logger } from '../../logger';

@Catch(InternalServerErrorException)
export class InternalErrorFilter implements ExceptionFilter {
  constructor(@Inject('I18n') private i18n: I18n, private logger: Logger) {}

  public catch(exception: InternalServerErrorException, response) {
    const statusCode = exception.getStatus();
    const { error, message } = exception.getResponse() as any;

    this.logger.error(error.message);

    response.status(statusCode).json({
      message,
      statusCode,
    });
  }
}
