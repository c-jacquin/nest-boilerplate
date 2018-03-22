import { Component } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';

export enum ContextTypes {
  LOCALE = 'LOCALE',
  ROOT = 'CONTEXT',
  REQUEST_ID = 'REQUEST_ID',
  REQUEST_TIMER = 'REQUEST_TIMER',
}

@Component()
export class Context {
  public create(cb) {
    createNamespace(ContextTypes.ROOT).run(cb);
  }

  public set locale(locale: string) {
    this.store.set(ContextTypes.LOCALE, locale);
  }

  public get locale() {
    return this.store.get(ContextTypes.LOCALE);
  }

  public set requestId(requestId) {
    this.store.set(ContextTypes.REQUEST_ID, requestId);
  }

  public get requestId() {
    return this.store.get(ContextTypes.REQUEST_ID);
  }

  public get requestTimer() {
    return this.store.get(ContextTypes.REQUEST_TIMER);
  }

  public set requestTimer(requestTimer) {
    this.store.set(ContextTypes.REQUEST_TIMER, requestTimer);
  }

  public get store() {
    return getNamespace(ContextTypes.ROOT);
  }
}
