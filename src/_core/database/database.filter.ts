import { Catch, ExceptionFilter } from '@nestjs/common';

import { I18n } from '../i18n';
import { Logger } from '../logger';
import { DatabaseException } from './database.exception';

@Catch(DatabaseException)
export class DatabaseFilter implements ExceptionFilter {
  constructor(private i18n: I18n, private logger: Logger) {}

  public catch(exception: DatabaseException, response) {
    const statusCode = exception.getStatus();

    this.logger.error(exception.getResponse() as string);

    response.status(statusCode).json({
      message: this.i18n.translate('error.database'),
      statusCode,
    });
  }
}
