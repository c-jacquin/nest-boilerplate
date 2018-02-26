import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as sinon from 'sinon';

import { Repository } from '../../__mocks__/Repository.mock';
import { I18nModule } from '../../_core';
import { UserService } from '../user.component';

@suite('unit UserService component')
class UserServiceUnit {
  private userRepository: Repository;
  private userService: UserService;

  public async before() {
    await this.setupModule();
  }

  @test('findOrCreate method should call the findOne method of user repository')
  public async findOrCreate() {
    const spy = sinon.spy(this.userRepository, 'findOne');
    await this.userService.findOrCreate({ login: 'test', id: 3 });
    expect(spy.called).to.equal(true);
  }

  @test(
    'findOrCreate method should call the save method of user repository if the findOne method return undefined',
  )
  public async findOrCreateFail() {
    Repository.prototype.findOne = () => Promise.resolve(undefined);
    await this.setupModule();
    const spy = sinon.spy(this.userRepository, 'save');
    await this.userService.findOrCreate({ login: 'test', id: 3 });
    expect(spy.called).to.equal(true);
  }

  @test('removeAll should call the clear method of the user repository')
  public async removeAll() {
    const spy = sinon.spy(this.userRepository, 'clear');
    await this.userService.removeAll();
    expect(spy.called).to.equal(true);
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      components: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
      imports: [I18nModule],
    }).compile();

    this.userRepository = module.get<Repository>('UserRepository');
    this.userService = module.get<UserService>(UserService);
  }
}
