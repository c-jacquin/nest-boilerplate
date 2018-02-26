import { Component } from '@nestjs/common';

@Component()
export class Repository {
  public findOne() {
    return Promise.resolve({});
  }

  public save() {
    return Promise.resolve({});
  }

  public clear() {
    return Promise.resolve();
  }
}
