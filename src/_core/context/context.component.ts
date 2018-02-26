import { Component } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import * as yenv from 'yenv';

import { Env } from '../env/env.component';

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
    this.context.set(ContextTypes.LOCALE, locale);
  }

  public get locale() {
    return this.context.get(ContextTypes.LOCALE);
  }

  public set request(request) {
    this.context.set(ContextTypes.REQUEST, request);
  }

  public get request() {
    return this.context.get(ContextTypes.REQUEST);
  }

  public get response() {
    return this.context.get(ContextTypes.RESPONSE);
  }

  public set response(response) {
    this.context.set(ContextTypes.RESPONSE, response);
  }

  public get requestId() {
    return this.request.id;
  }

  public get context() {
    return getNamespace(ContextTypes.ROOT);
  }
}
