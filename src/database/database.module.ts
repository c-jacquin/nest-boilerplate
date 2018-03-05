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
      entities: [path.join(process.cwd(), env.TYPEORM_ENTITIES)],
      logging: env.TYPEORM_LOGGING,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      type: env.TYPEORM_CONNECTION,
      url: env.TYPEORM_URL,
    }),
  ],
})
export class DatabaseModule {}
