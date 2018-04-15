import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../entities/account.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Roles } from '../enums/Roles';
import { PasswordService } from '../services/password.component';

const userData = {
  email: 'admin@admin.com',
};

@Component()
export class AdminFixture {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  public async insertData() {
    const accountsLength = await this.accountRepository.count();
    if (accountsLength === 0) {
      let user: User;
      user = (await this.userRepository.findOne(userData)) as User;
      if (!user) {
        user = await this.userRepository.save(userData);
      }
      const promises: Array<Promise<any>> = [];
      for (const role in Roles) {
        if (Roles[role]) {
          let existingRole = await this.roleRepository.findOne({ name: role });
          if (!existingRole) {
            existingRole = await this.roleRepository.save({ name: role });

            if (existingRole.name === Roles.ADMIN) {
              promises.push(
                this.accountRepository.save({
                  login: 'admin',
                  password: await this.passwordService.hash('admin'),
                  role: existingRole,
                  user,
                }),
              );
            }
          }
        }
      }
      return Promise.all(promises);
    } else {
      return Promise.resolve();
    }
  }
}
