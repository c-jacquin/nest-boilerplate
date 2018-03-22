import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';

import { Env } from '../env.component';

@suite('unit Env component')
export class EnvComponentUnit {
  private env: Env;

  public async before() {
    await this.setupModule();
  }

  @test('isTest should be truthy')
  public isTest() {
    expect(this.env.isTest()).to.equal(true);
  }

  @test('isLocal should be falsy')
  public isLocal() {
    expect(this.env.isLocal()).to.equal(false);
  }

  @test('isStaging should be falsy')
  public isStaging() {
    expect(this.env.isStaging()).to.equal(false);
  }

  @test('isProduction should be falsy')
  public isProduction() {
    expect(this.env.isProduction()).to.equal(false);
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      components: [Env],
    }).compile();

    this.env = module.get<Env>(Env);
  }
}
