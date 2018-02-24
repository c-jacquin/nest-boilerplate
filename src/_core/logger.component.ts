import { Component } from '@nestjs/common';
import { Logger as WinstonLogger, transports } from 'winston';

import { Env } from './env.component';

const formatter = options =>
  options.meta && options.meta.requestId
    ? `[RQID=${options.meta.requestId}] ${process.pid} ${options.message}`
    : `${options.message}`;

@Component()
export class Logger extends WinstonLogger {
  constructor(env: Env) {
    super({
      transports: [
        env.isProduction()
          ? new transports.File({
              filename: env.LOG_ERROR_FILE,
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
