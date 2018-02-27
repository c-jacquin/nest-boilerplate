import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as yenv from 'yenv';

import { Env } from '../env';
import { I18nModule } from '../i18n';
import { LoggerModule } from '../logger';
import { DatabaseService } from './database.component';
import { DatabaseFilter } from './database.filter';

const env = new Env();

@Module({
  components: [DatabaseFilter, DatabaseService],
  exports: [DatabaseFilter, DatabaseService],
  imports: [
    I18nModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      entities: [path.join(process.cwd(), env.TYPEORM_ENTITIES)],
      logging: env.TYPEORM_LOGGING,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      type: env.TYPEORM_CONNECTION,
      url: env.TYPEORM_URL,
    }),
  ],
})
export class DatabaseModule {}
