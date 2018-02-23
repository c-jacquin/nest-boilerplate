import { Component } from '@nestjs/common';
import * as yenv from 'yenv';

enum AppEnv {
  TEST = 'test',
  LOCAL = 'local',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

@Component()
export class Env {
  public NODE_ENV: string;
  public PORT: number;

  constructor() {
    return Object.assign(this, yenv());
  }

  public isTest() {
    return this.NODE_ENV === AppEnv.TEST;
  }

  public isLocal() {
    return this.NODE_ENV === AppEnv.LOCAL;
  }

  public isProduction() {
    return this.NODE_ENV === AppEnv.PRODUCTION;
  }

  public isStaging() {
    return this.NODE_ENV === AppEnv.STAGING;
  }
}
