import { Component, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Account } from '../entities/account.entity';

@Component()
export class PasswordService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  public hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  public async authenticateAccount(
    login: string,
    password: string,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      relations: ['user'],
      where: { login },
    });

    if (!account) {
      throw new UnauthorizedException();
    }

    const isPasswordOk = await this.compare(
      password,
      account.password as string,
    );

    if (!isPasswordOk) {
      throw new UnauthorizedException();
    }

    return account;
  }
}
