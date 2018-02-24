import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as yenv from 'yenv';

import { Env } from './_core/env.component';
import { AppController } from './app.controller';

const env = yenv();

@Module({
  components: [Env],
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      entities: [path.join(process.cwd(), env.TYPEORM_ENTITIES)],
      logging: env.TYPEORM_LOGGING,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      type: env.TYPEORM_CONNECTION,
      url: env.TYPEORM_URL,
    }),
  ],
})
export class ApplicationModule {}
