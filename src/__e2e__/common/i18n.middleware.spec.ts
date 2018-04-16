import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import express from 'express';
import { suite, test } from 'mocha-typescript';
import sinon from 'sinon';
import request from 'supertest';

import { ApplicationModule } from '../../app.module';
import { CommonModule, I18n } from '../../common';
import { DatabaseModule, DatabaseService } from '../../database';

let app: any;
let databaseService: DatabaseService;
let i18n: I18n;
const server = express();

@suite('e2e i18n middleware')
export class I18nFilterE2E {
  // private app: any;
  // private databaseService: DatabaseService;

  public static async setupModule() {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    databaseService = module
      .select(DatabaseModule)
      .get<DatabaseService>(DatabaseService);

    i18n = module.select(CommonModule).get<I18n>('I18n');

    app = module.createNestApplication(server);
    app.init();
  }

  public static async before() {
    await I18nFilterE2E.setupModule();
  }

  public static async after() {
    await app.close();
    // await this.databaseService.drop();
    await databaseService.closeConnection();
  }

  @test(
    'should store the value of Content-Language header on the context if present',
  )
  public async middleware() {
    const spy = sinon.spy(i18n, 'setLocale');
    await request(server)
      .get('/swagger')
      .set('content-language', 'fr');

    expect(spy.called).to.equal(true);
    expect(i18n.locale()).to.equal('fr');
  }
}
