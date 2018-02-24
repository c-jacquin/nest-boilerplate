import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import * as uuid from 'uuid';

@Middleware()
export class RequestIdMiddleware implements NestMiddleware {
  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      req.requestId = uuid();
      next();
    };
  }
}
