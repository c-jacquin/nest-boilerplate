import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../_core';
import { Auth } from './auth.component';
import { AuthController } from './auth.controller';
import { User } from './user.entity';

@Module({
  components: [Auth],
  controllers: [AuthController],
  imports: [CoreModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
