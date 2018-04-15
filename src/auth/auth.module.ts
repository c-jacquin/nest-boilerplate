import {
  Inject,
  MiddlewaresConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule, Env } from '../common';
import { DatabaseModule } from '../database';
import { AuthController } from './auth.controller';
import { AccountController } from './entities/account.controller';
import { Account } from './entities/account.entity';
import { RoleController } from './entities/role.controller';
import { Role } from './entities/role.entity';
import { UserController } from './entities/user.controller';
import { User } from './entities/user.entity';
import { ExposeUserMiddleware } from './middlewares/exposeUser.middleware';
import { AdminFixture } from './services/admin.fixture';
import { PasswordService } from './services/password.component';
import { TokenService } from './services/token.component';

@Module({
  components: [AdminFixture, PasswordService, TokenService],
  controllers: [
    AccountController,
    AuthController,
    RoleController,
    UserController,
  ],
  exports: [PasswordService, TokenService],
  imports: [
    CommonModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Account, Role, User]),
  ],
})
export class AuthModule implements NestModule, OnModuleInit {
  constructor(
    private adminFixture: AdminFixture,
    @Inject(Env) private env: Env,
  ) {}

  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(ExposeUserMiddleware).forRoutes({ path: '*' });
  }

  public async onModuleInit() {
    if (!this.env.isTest()) {
      await this.adminFixture.insertData();
    }
  }
}
