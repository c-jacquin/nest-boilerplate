import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import uuid from 'uuid';

import { Context } from '../context';

@Middleware()
export class ContextMiddleware implements NestMiddleware {
  constructor(private ctx: Context) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      req.id = uuid();
      this.ctx.create(() => {
        this.ctx.requestId = req.id;
        next();
      });
    };
  }
}
