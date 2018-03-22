import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import * as webpack from 'webpack';

import { CommonModule, Env } from '../common';
import * as webpackConfig from './config/webpack.config.dev';

const compiler = webpack(webpackConfig);

@Module({
  imports: [CommonModule],
})
export class AdminModule implements NestModule {
  constructor(private env: Env) {}

  public configure(consumer: MiddlewaresConsumer): void {
    if (this.env.isProduction()) {
      consumer
        .apply(express.static(path.join(process.cwd(), 'public')))
        .forRoutes({ path: '/admin' });
    } else if (this.env.isLocal()) {
      consumer
        .apply(require('webpack-dev-middleware')(compiler))
        .forRoutes({ path: '*' });
    }
  }
}
