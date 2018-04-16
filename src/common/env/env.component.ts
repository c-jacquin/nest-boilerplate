import { Component } from '@nestjs/common';
import yenv from 'yenv';

enum AppEnv {
  LOCAL = 'local',
  PRODUCTION = 'production',
  STAGING = 'staging',
  TEST = 'test',
}

@Component()
export class Env {
  public ACCESS_TOKEN_SECRET: string;
  public ACCESS_TOKEN_DURATION: number;
  public SWAGGER_JSON_PATH: string;
  public DEBUG: boolean;
  public DEFAULT_LOCALE: string;
  public GITHUB_API: string;
  public GITHUB_SECRET: string;
  public GITHUB_TOKEN_URI: string;
  public LOG_FILE: string;
  public LOG_LEVEL: string;
  public NODE_ENV: string;
  public PORT: number;
  public SUPPORTED_LANGUAGES: string[];
  public TYPEORM_CONNECTION: 'mariadb' | 'mysql';
  public TYPEORM_DATABASE: string;
  public TYPEORM_ENTITIES: string;
  public TYPEORM_LOGGING: boolean;
  public TYPEORM_SYNCHRONIZE: boolean;
  public TYPEORM_HOST: string;
  public TYPEORM_PASSWORD: string;
  public TYPEORM_PORT: number;
  public TYPEORM_USERNAME: string;

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
