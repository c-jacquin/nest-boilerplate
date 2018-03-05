import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as express from 'express';
import { suite, test } from 'mocha-typescript';
import * as sinon from 'sinon';
import * as request from 'supertest';

// import { ApplicationModule } from '../../../app.module';
import { DatabaseModule, DatabaseService } from '../../../database';
import { CommonModule } from '../../index';
import { I18n } from '../index';

@suite('e2e i18n middleware')
class I18nFilterE2E {
  private app: any;
  private databaseService: DatabaseService;
  private i18n: I18n;
  private server = express();

  public async before() {
    await this.setupModule();
  }

  public async after() {
    await this.app.close();
    await this.databaseService.drop();
    this.databaseService.closeConnection();
  }

  @test(
    'should store the value of Content-Language header on the context if present',
  )
  public async middleware() {
    const spy = sinon.spy(this.i18n, 'setLocale');
    const response = await request(this.server)
      .get('/swagger')
      .set('content-language', 'fr');

    expect(spy.called).to.equal(true);
    expect(this.i18n.locale()).to.equal('fr');
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      imports: [CommonModule, DatabaseModule],
    }).compile();

    this.databaseService = module
      .select(DatabaseModule)
      .get<DatabaseService>(DatabaseService);

    this.i18n = module.select(CommonModule).get<I18n>('I18n');

    this.app = module.createNestApplication(this.server);
    this.app.init();
  }
}
