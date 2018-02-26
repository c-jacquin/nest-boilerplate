import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as sinon from 'sinon';

import { Context, I18n } from '../../_core';
import { Env } from '../../_core/env';
import { Http } from '../../_core/http/__mocks__/http.component.mock';
import { AuthService } from '../auth.component';

@suite('unit AuthService component')
class AuthComponentUnit {
  private http: Http;
  private authService: AuthService;

  public async before() {
    const module = await Test.createTestingModule({
      components: [AuthService, Env, Http, I18n, Context],
    }).compile();

    this.http = module.get<Http>(Http);
    this.authService = module.get<AuthService>(AuthService);
  }

  @test('github method should call the post method of http twice')
  public async github() {
    const postSpy = sinon.spy(this.http, 'post');
    const getSpy = sinon.spy(this.http, 'get');
    await this.authService.github({ code: '', clientId: '' });
    expect(postSpy.called).to.equal(true);
    expect(getSpy.called).to.equal(true);
  }
}
