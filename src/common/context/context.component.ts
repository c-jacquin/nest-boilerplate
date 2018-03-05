import { Component } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import * as yenv from 'yenv';

import { Env } from '../env';

export enum ContextTypes {
  LOCALE = 'locale',
  ROOT = 'context',
  REQUEST = 'request',
  RESPONSE = 'response',
}

@Component()
export class Context {
  constructor(private env: Env) {}

  public create(cb) {
    createNamespace(ContextTypes.ROOT).run(cb);
  }

  public set locale(locale: string) {
    this.store.set(ContextTypes.LOCALE, locale);
  }

  public get locale() {
    return this.store.get(ContextTypes.LOCALE);
  }

  public set request(request) {
    this.store.set(ContextTypes.REQUEST, request);
  }

  public get request() {
    return this.store.get(ContextTypes.REQUEST);
  }

  public get response() {
    return this.store.get(ContextTypes.RESPONSE);
  }

  public set response(response) {
    this.store.set(ContextTypes.RESPONSE, response);
  }

  public get requestId() {
    return this.request.id;
  }

  public get store() {
    return getNamespace(ContextTypes.ROOT);
  }
}
