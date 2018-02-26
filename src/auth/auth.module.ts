import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule, EnvModule, HttpModule, I18nModule } from '../_core';
import { UserModule } from '../user';
import { AuthService } from './auth.component';
import { AuthController } from './auth.controller';

@Module({
  components: [AuthService],
  controllers: [AuthController],
  imports: [DatabaseModule, EnvModule, I18nModule, HttpModule, UserModule],
})
export class AuthModule {}
