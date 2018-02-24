import { Component } from '@nestjs/common';
import { Logger as WinstonLogger, transports } from 'winston';

import { Env } from './env.component';

const formatter = options =>
  options.meta && options.meta.requestId
    ? `[RQID=${options.meta.requestId}] ${options.message}`
    : `${options.message}`;

@Component()
export class Logger extends WinstonLogger {
  public static LOG_FILE = 'log/error.log';

  constructor(env: Env) {
    super({
      transports: [
        env.isProduction()
          ? new transports.File({
              filename: Logger.LOG_FILE,
              formatter,
              level: env.LOG_LEVEL,
            })
          : new transports.Console({
              colorize: true,
              formatter,
              level: env.LOG_LEVEL,
            }),
      ],
    });
  }
}
