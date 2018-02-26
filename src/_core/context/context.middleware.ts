import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import * as uuid from 'uuid';

import { Context } from '../context/context.component';

@Middleware()
export class ContextMiddleware implements NestMiddleware {
  constructor(private ctx: Context) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      req.id = uuid();
      this.ctx.create(() => {
        this.ctx.request = req;
        this.ctx.response = res;
        next();
      });
    };
  }
}
