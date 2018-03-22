import { Test } from '@nestjs/testing';
import * as express from 'express';
import { suite, test } from 'mocha-typescript';
import * as request from 'supertest';

import { ApplicationModule } from '../../app.module';
import { DatabaseModule, DatabaseService } from '../../database';

@suite('e2e notFound filter')
export class NotFoundFilterE2E {
  private app: any;
  private databaseService: DatabaseService;
  private server = express();

  public async before() {
    await this.setupModule();
  }

  public async after() {
    await this.app.close();
    await this.databaseService.drop();
    this.databaseService.closeConnection();
  }

  @test('should respond with a 404 status and the correct message')
  public async filter() {
    return request(this.server)
      .get('/')
      .expect(404);
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    this.databaseService = module
      .select(DatabaseModule)
      .get<DatabaseService>(DatabaseService);

    this.app = module.createNestApplication(this.server);
    this.app.init();
  }
}
