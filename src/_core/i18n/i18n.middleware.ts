import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';

import { I18n } from './i18n.component';

@Middleware()
export class I18nMiddleware implements NestMiddleware {
  constructor(private i18n: I18n) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      if (req.headers['content-language']) {
        this.i18n.setLocale(req.headers['content-language']);
      }

      next();
    };
  }
}
