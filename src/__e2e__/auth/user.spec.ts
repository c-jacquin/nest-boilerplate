import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as express from 'express';
import { suite, test } from 'mocha-typescript';
import * as request from 'supertest';

import { ApplicationModule } from '../../app.module';
import { AdminFixture, AuthModule } from '../../auth';
import { DatabaseModule, DatabaseService } from '../../database';

@suite('e2e /api/user restFull API')
export class UserApiE2E {
  private app: any;
  private databaseService: DatabaseService;
  private adminFixture: AdminFixture;
  private user = {
    avatar: 'foo.jpg',
    email: 'jon@nightswatch.com',
    name: 'Jonsnow',
  };
  private server = express();
  private token: string;
  private id: string;

  public async before() {
    await this.setupModule();
    await this.adminFixture.insertData();

    const { body } = await request(this.server)
      .post('/auth/signin')
      .send({
        login: 'admin',
        password: 'admin',
      });
    this.token = body.accessToken;
    this.id = body.account.user.id;
  }

  public async after() {
    await this.app.close();
    await this.databaseService.drop();
    await this.databaseService.closeConnection();
  }

  @test('should create a user entry in the db')
  public async create() {
    const response = await request(this.server)
      .post('/api/user')
      .set('Authorization', `Token ${this.token}`)
      .send(this.user)
      .expect(201);

    expect(response.body).to.contains(this.user);
  }

  @test('should return a list of users')
  public async find() {
    const response = await request(this.server)
      .get('/api/user')
      .set('Authorization', `Token ${this.token}`)
      .expect(200);

    expect(Array.isArray(response.body));
  }

  @test('should return a given user')
  public async findOne() {
    return request(this.server)
      .get(`/api/user/${this.id}`)
      .set('Authorization', `Token ${this.token}`)
      .expect(200);
  }

  @test('should update a given user')
  public async update() {
    const newName = 'foo';
    return request(this.server)
      .put(`/api/user/${this.id}`)
      .set('Authorization', `Token ${this.token}`)
      .send({
        avatar: newName,
      })
      .expect(200);
  }

  @test('should remove a given user')
  public async remove() {
    return request(this.server)
      .delete(`/api/user/${this.id}`)
      .set('Authorization', `Token ${this.token}`)
      .expect(200);
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    this.databaseService = module
      .select(DatabaseModule)
      .get<DatabaseService>(DatabaseService);

    this.adminFixture = module
      .select(AuthModule)
      .get<AdminFixture>(AdminFixture);

    this.app = module.createNestApplication(this.server);
    this.app.init();
  }
}
