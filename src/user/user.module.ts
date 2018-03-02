import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule, EnvModule, HttpModule, I18nModule } from '../_core';
import { UserService } from './user.component';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  components: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [DatabaseModule, I18nModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
