import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import sinon from 'sinon';

import { Repository } from '../../database/__mocks__/Repository.mock';
import { AuthController } from '../auth.controller';
import { PasswordService } from '../services/__mocks__/password.component.mock';
import { TokenService } from '../services/__mocks__/token.component.mock';

@suite('unit AuthController')
export class AuthControllerUnit {
  private accountRepository: Repository;
  private authController: AuthController;
  private tokenService: TokenService;
  private passwordService: PasswordService;
  private userRepository: Repository;

  public async before() {
    const userRepository = {
      provide: 'UserRepository',
      useClass: Repository,
    };
    const accountRepository = {
      provide: 'AccountRepository',
      useClass: Repository,
    };
    const roleRepository = {
      provide: 'RoleRepository',
      useClass: Repository,
    };
    const module = await Test.createTestingModule({
      components: [
        accountRepository,
        userRepository,
        roleRepository,
        PasswordService,
        TokenService,
      ],
      controllers: [AuthController],
    }).compile();

    this.authController = module.get<AuthController>(AuthController);
    this.accountRepository = module.get<Repository>('AccountRepository');
    this.passwordService = module.get<PasswordService>(PasswordService);
    this.tokenService = module.get<TokenService>(TokenService);
    this.userRepository = module.get<Repository>('UserRepository');
  }

  @test('signup method should call related services methods')
  public async signup() {
    const dto = {
      email: 'test@test.test',
      login: 'test',
      password: 'test',
    };
    const refreshTokenSpy = sinon.spy(this.tokenService, 'createRefreshToken');
    const accessTokenSpy = sinon.spy(this.tokenService, 'createAccessToken');
    const userSpy = sinon.spy(this.userRepository, 'save');
    const accountSpy = sinon.spy(this.accountRepository, 'save');
    const passwordSpy = sinon.spy(this.passwordService, 'hash');

    await this.authController.signup(dto);

    expect(refreshTokenSpy.called);
    expect(accessTokenSpy.called);
    expect(userSpy.called);
    expect(accountSpy.called);
    expect(passwordSpy.called);
  }

  @test('sigin method should call related services methods')
  public async signin() {
    const dto = {
      login: 'test',
      password: 'test',
    };
    const passwordSpy = sinon.spy(this.passwordService, 'authenticateAccount');
    const refreshTokenSpy = sinon.spy(this.tokenService, 'createRefreshToken');
    const accessTokenSpy = sinon.spy(this.tokenService, 'createAccessToken');
    const accountSpy = sinon.spy(this.accountRepository, 'update');

    await this.authController.signin(dto);

    expect(passwordSpy.called);
    expect(refreshTokenSpy.called);
    expect(accessTokenSpy.called);
    expect(accountSpy.called);
  }
}
