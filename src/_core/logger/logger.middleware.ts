import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import * as onHeaders from 'on-headers';

import { Logger } from '../logger';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      const startAt = Date.now();

      onHeaders(res, () => {
        const diff = Date.now();
        const time = diff - startAt;

        this.logger.info(
          `${req.method} ${req.url} ${res.statusCode} ${time}ms`,
        );
      });
      next();
    };
  }
}
