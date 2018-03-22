import { Component } from '@nestjs/common';
import * as clfDate from 'clf-date';
import { Logger as WinstonLogger, transports } from 'winston';

import { Context } from '../context';
import { Env } from '../env';

@Component()
export class Logger extends WinstonLogger {
  constructor(env: Env, ctx: Context) {
    const formatter = ({ message }) => {
      const rId = ctx.requestId;

      return `${process.pid} - ${clfDate()} [RQID=${rId}] ${message}`;
    };

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
              level: env.DEBUG ? 'debug' : env.LOG_LEVEL,
            }),
      ],
    });
  }
}
