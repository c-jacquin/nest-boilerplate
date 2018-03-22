import { ServeStaticMiddleware } from '@nest-middlewares/serve-static';
import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';

import * as path from 'path';

import { CommonModule, Env } from '../common';

@Module({
  imports: [CommonModule],
})
export class AdminModule implements NestModule {
  constructor(private env: Env) {}
  public configure(consumer: MiddlewaresConsumer): void {
    if (this.env.isProduction()) {
      ServeStaticMiddleware.configure(path.join(process.cwd(), 'public'));
      consumer.apply(ServeStaticMiddleware).forRoutes({ path: '*' });
    } else if (this.env.isLocal()) {
      const webpack = require('webpack');
      const webpackConfig = require('./config/webpack.config.dev');
      const compiler = webpack(webpackConfig);

      consumer
        .apply(require('webpack-dev-middleware')(compiler))
        .forRoutes({ path: '*' });
    }
  }
}
