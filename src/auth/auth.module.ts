import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../_core';
import { UserModule } from '../user';
import { Auth } from './auth.component';
import { AuthController } from './auth.controller';

@Module({
  components: [Auth],
  controllers: [AuthController],
  imports: [CoreModule, UserModule],
})
export class AuthModule {}
