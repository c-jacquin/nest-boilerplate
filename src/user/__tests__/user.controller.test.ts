import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as ExpressResponse from 'mock-express-response';
import * as sinon from 'sinon';

import { UserService } from '../__mocks__/user.component.mock';
import { UserController } from '../user.controller';

@suite('unit User controller')
class UserControllerUnit {
  private userController: UserController;
  private userService: UserService;
  private response = new ExpressResponse();

  public async before() {
    await this.setupModule();
  }

  @test('create method should call the create method of userService')
  public async create() {
    const spy = sinon.spy(this.userService, 'create');
    await this.userController.create({ login: 'test' });
    expect(spy.called);
  }

  @test('find method should call the find method of userService')
  public async find() {
    const spy = sinon.spy(this.userService, 'find');
    await this.userController.find({ take: 4 });
    expect(spy.calledWith({ take: 4 }));
  }

  @test(
    'find method should call the find method of userService with formatted ordering params',
  )
  public async findOrdered() {
    const spy = sinon.spy(this.userService, 'find');
    await this.userController.find({ orderBy: 'name', order: 'ASC' });
    expect(spy.calledWith({ order: { name: 'ASC' } }));
  }

  @test('findOne method should call the findOneById method of userService')
  public async findOne() {
    const spy = sinon.spy(this.userService, 'findOneById');
    await this.userController.findOne('1', {}, this.response);
    expect(spy.calledWith(1, {}));
  }

  @test('remove method should call the remove method of userService')
  public async remove() {
    const spy = sinon.spy(this.userService, 'remove');
    await this.userController.remove('1', this.response);
    expect(spy.calledWith(1, {}));
  }

  @test('update method should call the update method of userService')
  public async update() {
    const spy = sinon.spy(this.userService, 'update');
    await this.userController.update(
      '507f191e810c19729de860ea',
      {},
      this.response,
    );
    expect(spy.calledWith({ _id: '507f191e810c19729de860ea' }, {}));
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      components: [UserService],
      controllers: [UserController],
    }).compile();

    this.userController = module.get<UserController>(UserController);
    this.userService = module.get<UserService>(UserService);
  }
}
