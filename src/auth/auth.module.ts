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
import { RoleController } from './entities/role.controller';
import { Role } from './entities/role.entity';
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
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) private userRepository: Repository<User>,
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
      /* tslint:disable */
      for (const role in Roles) {
        let existingRole = await this.roleRepository.findOne({ name: role });

        if (!existingRole) {
          existingRole = await this.roleRepository.save({ name: role })

          if (existingRole.name === Roles.ADMIN) {
            await this.accountRepository.save({
              login: 'admin',
              password: await this.passwordService.hash('admin'),
              role: existingRole,
              user,
            });
          }
        }
      }
      /* tslint:enable */
    }
  }
}
