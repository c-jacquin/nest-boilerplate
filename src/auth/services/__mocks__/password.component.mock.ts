import { Component } from '@nestjs/common';

import { Account } from '../../entities/account.entity';

@Component()
export class PasswordService {
  public hash(password: string): Promise<string> {
    return Promise.resolve('hash');
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async authenticateAccount(
    login: string,
    password: string,
  ): Promise<Account> {
    return Promise.resolve({ id: '1', user: null, roles: [] });
  }
}
