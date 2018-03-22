import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';

import { TokenService } from '../services/token.component';

@Middleware()
export class ExposeUserMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return async (req, res, next) => {
      let token;
      try {
        if (req.headers.authorization) {
          token = req.headers.authorization.split(' ')[1];
          const account = await this.tokenService.parse(token);

          req.user = {
            ...account.user,
            account,
          };
        }
      } finally {
        next();
      }
    };
  }
}
