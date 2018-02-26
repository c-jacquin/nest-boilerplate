import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as express from 'express';
import { suite, test } from 'mocha-typescript';
import * as nock from 'nock';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import { CoreModule } from '../../_core';
import { DatabaseModule, DatabaseService } from '../../_core/database';
import { AuthModule } from '../auth.module';

@suite('e2e /auth/github fail')
class AuthGithubFailE2E {
  private app: any;
  private databaseService: DatabaseService;
  private server = express();
  private oauthScope: nock.Scope;

  public async before() {
    await this.setupModule();
  }

  public async after() {
    await this.app.close();
    await this.databaseService.drop();
    await this.databaseService.closeConnection();
  }

  @test
  public async 'should fail if github request fails'() {
    this.setupNock();
    const response = await request(this.server)
      .post('/auth/github')
      .send({
        clientId: '',
        code: '',
      })
      .expect(500);

    this.oauthScope.done();
  }

  @test
  public async 'should fail with 400 if body type is not correct'() {
    const response = await request(this.server)
      .post('/auth/github')
      .send({
        clientId: 4,
      })
      .expect(400);
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    this.databaseService = module
      .select(DatabaseModule)
      .get<DatabaseService>(DatabaseService);

    this.app = module.createNestApplication(this.server);

    await this.app.init();
  }

  private setupNock() {
    this.oauthScope = nock('https://github.com/login/oauth')
      .post('/access_token')
      .reply(400);
  }
}
