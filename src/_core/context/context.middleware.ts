import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import * as uuid from 'uuid';

import { Context, ContextTypes } from '../context/context.component';

@Middleware()
export class ContextMiddleware implements NestMiddleware {
  constructor(private context: Context) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      req.id = uuid();
      this.context.create(ctx => {
        ctx.set(ContextTypes.REQUEST, req);
        ctx.set(ContextTypes.RESPONSE, res);
        next();
      });
    };
  }
}
