import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import { suite, test } from 'mocha-typescript';
import randToken from 'rand-token';
import sinon from 'sinon';

import { Env } from '../../../common/env';
import { Account } from '../../entities/account.entity';
import { TokenService } from '../token.component';

@suite('unit TokenService')
export class TokenServiceUnit {
  private tokenService: TokenService;
  private env: Env;
  private account: Account = {
    roles: [],
    user: {},
  };

  public async before() {
    const module = await Test.createTestingModule({
      components: [TokenService, Env],
    }).compile();

    this.tokenService = module.get<TokenService>(TokenService);
    this.env = module.get<Env>(Env);
  }

  @test('createRefreshToken method should call randtoken uid method')
  public createRefreshToken() {
    const spy = sinon.spy(randToken, 'uid');

    this.tokenService.createRefreshToken();
    expect(spy.calledWith(256)).to.equal(true);
  }

  @test('createAccessToken method should call jwt sign method')
  public async createAccessToken() {
    const spy = sinon.spy(jwt, 'sign');

    await this.tokenService.createAccessToken(this.account);
    expect(
      spy.calledWith(this.account, this.env.ACCESS_TOKEN_SECRET, {
        expiresIn: this.env.ACCESS_TOKEN_DURATION,
      }),
    ).to.equal(true);
  }

  @test('parse method should call jwt verify method')
  public async parse() {
    const spy = sinon.spy(jwt, 'verify');
    const token = await jwt.sign({ foo: 'bar' }, this.env.ACCESS_TOKEN_SECRET);
    await this.tokenService.parse(token);

    expect(spy.called).to.equal(true);
  }
}
