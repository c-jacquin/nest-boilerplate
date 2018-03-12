import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as express from 'express';
import { suite, test } from 'mocha-typescript';
import * as nock from 'nock';
import * as request from 'supertest';

import { ApplicationModule } from '../../app.module';
import { DatabaseModule, DatabaseService } from '../../database';

@suite('e2e /user restFull API')
class UserApiE2E {
  private app: any;
  private databaseService: DatabaseService;
  private user = {
    avatar: 'foo.jpg',
    email: 'jon@nightswatch.com',
    name: 'Jonsnow',
  };
  private server = express();

  public async before() {
    await this.setupModule();
  }

  public async after() {
    await this.app.close();
    await this.databaseService.drop();
    this.databaseService.closeConnection();
  }

  @test('should create a user entry in the db')
  public async create() {
    const response = await request(this.server)
      .post('/user')
      .send(this.user)
      .expect(201);

    expect(response.body).to.contains(this.user);
  }

  @test('should return a list of users')
  public async find() {
    await request(this.server)
      .post('/user')
      .send(this.user);

    const response = await request(this.server)
      .get('/user')
      .expect(200);

    expect(Array.isArray(response.body));
  }

  @test('should return a given user')
  public async findOne() {
    const { body: { id } } = await request(this.server)
      .post('/user')
      .send(this.user);

    const response = await request(this.server)
      .get(`/user/${id}`)
      .expect(200);

    expect(response.body).to.contain(this.user);
  }

  @test('should remove a given user')
  public async remove() {
    const { body: { id } } = await request(this.server)
      .post('/user')
      .send(this.user);

    const response = await request(this.server)
      .delete(`/user/${id}`)
      .expect(200);
  }

  @test('should update a given user')
  public async update() {
    const newName = 'foo';
    const { body: { id } } = await request(this.server)
      .post('/user')
      .send(this.user);

    const response = await request(this.server)
      .put(`/user/${id}`)
      .send({
        avatar: newName,
      })
      .expect(200);
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
