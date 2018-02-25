import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../_core';
import { UserService } from './user.component';
import { User } from './user.entity';

@Module({
  components: [UserService],
  exports: [UserService],
  imports: [CoreModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
