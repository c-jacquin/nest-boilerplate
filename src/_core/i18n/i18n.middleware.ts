import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';

import { Context } from '../context/context.component';

@Middleware()
export class I18nMiddleware implements NestMiddleware {
  constructor(private ctx: Context) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      if (req.headers['Content-Language']) {
        this.ctx.locale = req.headers['Content-Language'];
      }

      next();
    };
  }
}
