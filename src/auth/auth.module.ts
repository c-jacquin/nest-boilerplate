import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { AuthController } from './auth.controller';
import { AccountController } from './entities/account.controller';
import { Account } from './entities/account.entity';
import { UserController } from './entities/user.controller';
import { User } from './entities/user.entity';
import { GithubService } from './providers/github.component';
import { ProvidersController } from './providers/providers.controller';
import { PasswordService } from './services/password.component';
import { TokenService } from './services/token.component';

@Module({
  components: [GithubService, PasswordService, TokenService],
  controllers: [
    AccountController,
    AuthController,
    ProvidersController,
    UserController,
  ],
  imports: [
    CommonModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Account, User]),
  ],
})
export class AuthModule {}
