import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule, EnvModule, HttpModule } from '../_core';

import { UserService } from './user.component';
import { User } from './user.entity';

@Module({
  components: [UserService],
  exports: [UserService],
  imports: [
    DatabaseModule,
    EnvModule,
    HttpModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class UserModule {}
