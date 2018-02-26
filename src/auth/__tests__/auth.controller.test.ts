import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as sinon from 'sinon';

import { UserService } from '../../user/__mocks__/user.component.mock';
import { AuthService } from '../__mocks__/auth.component.mock';
import { AuthController } from '../auth.controller';

@suite('unit AuthController')
class AuthControllerUnit {
  private userService: UserService;
  private authService: AuthService;
  private authController: AuthController;

  public async before() {
    const module = await Test.createTestingModule({
      components: [AuthService, UserService],
      controllers: [AuthController],
    }).compile();

    this.userService = module.get<UserService>(UserService);
    this.authService = module.get<AuthService>(AuthService);
    this.authController = module.get<AuthController>(AuthController);
  }

  @test('githubAuth method should call the github method of the auth service')
  public async githubAuth() {
    const githubSpy = sinon.spy(this.authService, 'github');
    const userSpy = sinon.spy(this.userService, 'findOrCreate');

    await this.authController.githubAuth({ code: '', clientId: '' });
    expect(githubSpy.called).to.equal(true);
    expect(userSpy.called).to.equal(true);
  }
}
