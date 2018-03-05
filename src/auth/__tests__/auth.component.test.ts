import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as sinon from 'sinon';

import { Context, Env, I18n, i18nFactory, Logger } from '../../common';
import { Http } from '../../common/http/__mocks__/http.component.mock';
import { AuthService } from '../auth.component';

@suite('unit AuthService component')
class AuthComponentUnit {
  private http: Http;
  private authService: AuthService;

  public async before() {
    Http.prototype.get = () => Promise.resolve({ data: {} });

    const module = await Test.createTestingModule({
      components: [AuthService, Env, Http, i18nFactory, Logger, Context],
    }).compile();

    this.http = module.get<Http>(Http);
    this.authService = module.get<AuthService>(AuthService);
  }

  @test('github method should call the post and get method of http service')
  public async github() {
    const postSpy = sinon.spy(this.http, 'post');
    const getSpy = sinon.spy(this.http, 'get');
    await this.authService.github({ code: '', clientId: '' });
    expect(postSpy.called).to.equal(true);
    expect(getSpy.called).to.equal(true);
  }
}