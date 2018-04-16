import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import JsMeter from 'js-meter';
import onHeaders from 'on-headers';

import { Env } from '../env';
import { Logger } from './logger.component';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private env: Env, private logger: Logger) {}

  public resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      let jsMeter: JsMeter;
      if (this.env.DEBUG) {
        jsMeter = new JsMeter({ isPrint: false, isMs: true, isKb: true });
      }
      const startAt = Date.now();

      onHeaders(res, () => {
        const diff = Date.now();
        const time = diff - startAt;
        this.logger.info(
          `${req.method} ${req.originalUrl} ${res.statusCode} +${time}ms`,
        );
        if (this.env.DEBUG) {
          const {
            diffCPU,
            diffHeapTotal,
            diffHeapUsed,
            diffExternal,
            diffRAM,
          } = jsMeter.stop();
          this.logger.debug(
            `CPU: ${diffCPU}ms RAM: ${diffRAM}kb HeapTotal: ${diffHeapTotal}kb HeapUsed: ${diffHeapUsed}kb External: ${diffExternal}kb`,
          );
        }
      });
      next();
    };
  }
}
