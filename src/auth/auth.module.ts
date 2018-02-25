import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../_core';
import { UserModule } from '../user';
import { AuthService } from './auth.component';
import { AuthController } from './auth.controller';

@Module({
  components: [AuthService],
  controllers: [AuthController],
  imports: [CoreModule, UserModule],
})
export class AuthModule {}
