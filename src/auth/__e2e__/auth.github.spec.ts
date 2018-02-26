import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as express from 'express';
import { suite, test } from 'mocha-typescript';
import * as nock from 'nock';
import * as request from 'supertest';

import { DatabaseModule, DatabaseService } from '../../_core/database';
import { AuthModule } from '../auth.module';

@suite('e2e /auth/github success')
class AuthGithubE2E {
  private app: any;
  private databaseService: DatabaseService;
  private token = '123ABC';
  private user = {
    id: 1234,
    login: 'mylogin',
  };
  private server = express();
  private oauthScope: nock.Scope;
  private userScope: nock.Scope;

  public async before() {
    this.setupNock();
    await this.setupModule();
  }

  public async after() {
    await this.app.close();
    await this.databaseService.drop();
    this.databaseService.closeConnection();
  }

  @test
  public async 'should return the github user and token'() {
    const response = await request(this.server)
      .post('/auth/github')
      .send({
        clientId: '',
        code: '',
      })
      .expect(201);

    expect(response.body.token).to.equal(this.token);
    expect(response.body.user.login).to.equal(this.user.login);

    this.oauthScope.done();
    this.userScope.done();
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    this.databaseService = module
      .select(DatabaseModule)
      .get<DatabaseService>(DatabaseService);

    this.app = module.createNestApplication(this.server);
    this.app.init();
  }

  private setupNock() {
    this.oauthScope = nock('https://github.com/login/oauth')
      .post('/access_token')
      .reply(200, `access_token=${this.token}&`);

    this.userScope = nock('https://api.github.com')
      .get('/user')
      .reply(200, this.user);
  }
}
