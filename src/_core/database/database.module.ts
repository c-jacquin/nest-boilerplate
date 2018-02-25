import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as yenv from 'yenv';
import { DatabaseService } from './database.component';
const env = yenv();

@Module({
  components: [DatabaseService],
  exports: [DatabaseService],
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
export class DatabaseModule {}
