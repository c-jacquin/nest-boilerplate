import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as yenv from 'yenv';

import { CommonModule, Env } from '../common';
import { DatabaseService } from './database.component';
import { DatabaseFilter } from './database.filter';

const env = new Env();

@Module({
  components: [DatabaseFilter, DatabaseService],
  exports: [DatabaseFilter, DatabaseService],
  imports: [
    CommonModule,
    TypeOrmModule.forRoot({
      database: env.TYPEORM_DATABASE,
      entities: [path.join(process.cwd(), env.TYPEORM_ENTITIES)],
      host: env.TYPEORM_HOST,
      logging: env.TYPEORM_LOGGING,
      password: env.TYPEORM_PASSWORD,
      port: env.TYPEORM_PORT,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      type: env.TYPEORM_CONNECTION,
      username: env.TYPEORM_USERNAME,
    }),
  ],
})
export class DatabaseModule {}
