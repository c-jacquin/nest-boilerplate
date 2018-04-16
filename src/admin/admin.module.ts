import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import express from 'express';
import path from 'path';

import { CommonModule, Env } from '../common';

@Module({
  imports: [CommonModule],
})
export class AdminModule {
  constructor(private env: Env) {}
  public configure(consumer: MiddlewaresConsumer): void {
    if (this.env.isLocal()) {
      const webpack = require('webpack');
      const webpackConfig = require('./config/webpack.config.dev');
      const compiler = webpack(webpackConfig);
      consumer
        .apply(require('webpack-dev-middleware')(compiler))
        .forRoutes({ path: '*', method: RequestMethod.GET });
    } else if (this.env.isProduction()) {
      consumer
        .apply(express.static(path.join(process.cwd(), 'admin')))
        .forRoutes({ path: '*', method: RequestMethod.GET });
    }
  }
}
