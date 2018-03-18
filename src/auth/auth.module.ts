import {
  MiddlewaresConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { AuthController } from './auth.controller';
import { AccountController } from './entities/account.controller';
import { Account } from './entities/account.entity';
import { UserController } from './entities/user.controller';
import { User } from './entities/user.entity';
import { Roles } from './enums/Roles';
import { ExposeUserMiddleware } from './middlewares/exposeUser.middleware';
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
  exports: [PasswordService, TokenService],
  imports: [
    CommonModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Account, User]),
  ],
})
export class AuthModule implements NestModule, OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private passwordService: PasswordService,
  ) {}

  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(ExposeUserMiddleware).forRoutes({ path: '*' });
  }

  public async onModuleInit() {
    const accountsLength = await this.accountRepository.count();
    if (accountsLength === 0) {
      const user = await this.userRepository.save({
        email: 'admin@admin.com',
      });
      await this.accountRepository.save({
        login: 'admin',
        password: await this.passwordService.hash('admin'),
        roles: [Roles.PEON, Roles.ADMIN],
        user,
      });
    }
  }
}
