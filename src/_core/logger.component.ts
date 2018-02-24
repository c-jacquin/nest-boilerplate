import { Component } from '@nestjs/common';
import * as clfDate from 'clf-date';
import { Logger as WinstonLogger, transports } from 'winston';

import { Env } from './env.component';

const formatter = options =>
  `${
    options.meta && options.meta.requestId
      ? `[RQID=${options.meta.requestId}]`
      : ''
  } [PID=${process.pid}] [${clfDate()}]  ${options.message}`;

@Component()
export class Logger extends WinstonLogger {
  constructor(env: Env) {
    super({
      transports: [
        env.isProduction()
          ? new transports.File({
              filename: env.LOG_FILE,
              formatter,
              json: false,
              level: env.LOG_LEVEL,
              maxFiles: 5,
              maxsize: 5242880,
            })
          : new transports.Console({
              colorize: true,
              formatter,
              json: false,
              level: env.LOG_LEVEL,
            }),
      ],
    });
  }
}
