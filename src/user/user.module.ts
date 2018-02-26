import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule, EnvModule, HttpModule, I18nModule } from '../_core';

import { UserService } from './user.component';
import { User } from './user.entity';

@Module({
  components: [UserService],
  exports: [UserService],
  imports: [
    DatabaseModule,
    EnvModule,
    HttpModule,
    I18nModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class UserModule {}
