import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { UserModule } from '../user';
import { AuthService } from './auth.component';
import { AuthController } from './auth.controller';

@Module({
  components: [AuthService],
  controllers: [AuthController],
  imports: [CommonModule, DatabaseModule, UserModule],
})
export class AuthModule {}
