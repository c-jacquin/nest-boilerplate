import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import sinon from 'sinon';

import { Repository } from '../../../database/__mocks__/Repository.mock';
import { PasswordService } from '../password.component';

@suite('unit PasswordService')
export class PasswordServiceUnit {
  private passwordService: PasswordService;
  private accountRepository: Repository;

  public async before() {
    const accountRepository = {
      provide: 'AccountRepository',
      useClass: Repository,
    };
    const module = await Test.createTestingModule({
      components: [accountRepository, PasswordService],
    }).compile();

    this.accountRepository = module.get<Repository>('AccountRepository');
    this.passwordService = module.get<PasswordService>(PasswordService);
  }

  @test('hash method should call bcrypt hash method')
  public async hash() {
    const spy = sinon.spy(bcrypt, 'hash');

    await this.passwordService.hash('test');
    expect(spy.calledWith('test', 12)).to.equal(true);
  }

  @test('compare method should call bcrypt compare method')
  public async compare() {
    const spy = sinon.spy(bcrypt, 'compare');

    await this.passwordService.compare('test', 'foo');
    expect(spy.calledWith('test', 'foo')).to.equal(true);
  }

  @test(
    'authenticateAccount method should call accountRepo findOne method and compare passwords',
  )
  public async authenticateAccount() {
    this.accountRepository.findOne = () =>
      Promise.resolve({ id: '2', password: bcrypt.hashSync('foo', 12) });

    const spy = sinon.spy(this.accountRepository, 'findOne');
    const compareSpy = sinon.spy(this.passwordService, 'compare');

    await this.passwordService.authenticateAccount('test', 'foo');
    expect(
      spy.calledWith({
        relations: ['user', 'role'],
        where: { login: 'test' },
      }),
    ).to.equal(true);
    expect(compareSpy.calledWith('foo', bcrypt.hashSync('foo', 12)));
  }

  @test(
    'authenticateAccount method should throw an Unauthorized exception if no matching account',
  )
  public async authenticateAccountNoAccount() {
    this.accountRepository.findOne = () => Promise.resolve();
    try {
      await this.passwordService.authenticateAccount('test', 'foo');
    } catch (err) {
      expect(err).to.be.instanceof(UnauthorizedException);
    }
  }

  @test(
    'authenticateAccount method should throw an Unauthorized exception if password doesnt match',
  )
  public async authenticateAccountBadPassword() {
    this.accountRepository.findOne = () =>
      Promise.resolve({ id: '2', password: bcrypt.hashSync('bar', 12) });
    try {
      await this.passwordService.authenticateAccount('test', 'foo');
    } catch (err) {
      expect(err).to.be.instanceof(UnauthorizedException);
    }
  }
}
