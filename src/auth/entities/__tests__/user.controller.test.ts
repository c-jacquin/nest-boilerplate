import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as ExpressResponse from 'mock-express-response';
import * as sinon from 'sinon';
import { Repository } from '../../../database/__mocks__/Repository.mock';

import { UserController } from '../user.controller';

@suite('unit User controller')
export class UserControllerUnit {
  private userController: UserController;
  private userRepository: Repository;
  private response = new ExpressResponse();

  public async before() {
    await this.setupModule();
  }

  @test('create method should call the create method of userService')
  public async create() {
    const spy = sinon.spy(this.userRepository, 'create');
    await this.userController.create({ name: 'test' });
    expect(spy.called);
  }

  @test('find method should call the find method of userService')
  public async find() {
    const spy = sinon.spy(this.userRepository, 'find');
    await this.userController.find({ take: 4 }, this.response);
    expect(spy.calledWith({ take: 4 }));
  }

  @test(
    'find method should call the find method of userService with formatted ordering params',
  )
  public async findOrdered() {
    const spy = sinon.spy(this.userRepository, 'find');
    await this.userController.find(
      { orderBy: 'name', order: 'ASC' },
      this.response,
    );
    expect(spy.calledWith({ order: { name: 'ASC' } }));
  }

  @test('findOne method should call the findOneById method of userService')
  public async findOne() {
    const spy = sinon.spy(this.userRepository, 'findOneById');
    await this.userController.findOne('1', {}, this.response);
    expect(spy.calledWith(1, {}));
  }

  @test('remove method should call the remove method of userService')
  public async remove() {
    const spy = sinon.spy(this.userRepository, 'deleteById');
    await this.userController.remove('1');
    expect(spy.calledWith(1, {}));
  }

  @test('update method should call the update method of userService')
  public async update() {
    const spy = sinon.spy(this.userRepository, 'update');
    await this.userController.update(1, {});
    expect(spy.calledWith({ id: '1' }, {}));
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      components: [
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: 'AccountRepository',
          useClass: Repository,
        },
      ],
      controllers: [UserController],
    }).compile();

    this.userController = module.get<UserController>(UserController);
    this.userRepository = module.get<Repository>('UserRepository');
  }
}
