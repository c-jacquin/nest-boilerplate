import { Component } from '@nestjs/common';
import * as yenv from 'yenv';

enum AppEnv {
  LOCAL = 'local',
  PRODUCTION = 'production',
  STAGING = 'staging',
  TEST = 'test',
}

@Component()
export class Env {
  public DEBUG: boolean;
  public DEFAULT_LOCALE: string;
  public GITHUB_API: string;
  public GITHUB_SECRET: string;
  public GITHUB_TOKEN_URI: string;
  public LOG_FILE: string;
  public LOG_LEVEL: string;
  public NODE_ENV: string;
  public PORT: number;
  public TYPEORM_CONNECTION: 'mongodb';
  public TYPEORM_ENTITIES: string;
  public TYPEORM_LOGGING: boolean;
  public TYPEORM_SYNCHRONIZE: boolean;
  public TYPEORM_URL: string;

  constructor() {
    return Object.assign(this, yenv());
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

  public isTest() {
    return this.NODE_ENV === AppEnv.TEST;
  }
}
