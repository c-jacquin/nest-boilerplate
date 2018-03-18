import { Component } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as randToken from 'rand-token';

import { Env } from '../../common';
import { Account } from '../entities/account.entity';

@Component()
export class TokenService {
  constructor(private env: Env) {}

  public createAccessToken(account: Account): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { ...account },
        this.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: this.env.ACCESS_TOKEN_DURATION,
        },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        },
      );
    });
  }

  public parse(token: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.env.ACCESS_TOKEN_SECRET,
        (err: Error, decoded: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }

  public createRefreshToken() {
    return randToken.uid(256);
  }
}
