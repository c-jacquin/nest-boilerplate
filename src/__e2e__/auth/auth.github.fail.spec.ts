import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as express from 'express';
import { suite, test } from 'mocha-typescript';
import * as nock from 'nock';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import { ApplicationModule } from '../../app.module';
import { DatabaseModule, DatabaseService } from '../../database';

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

  @test('should fail if github request fails')
  public async internalError() {
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

  @test('should fail with 400 if body type is not correct')
  public async validation() {
    const response = await request(this.server)
      .post('/auth/github')
      .send({
        clientId: 4,
      })
      .expect(400);
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
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
