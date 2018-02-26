import { Component } from '@nestjs/common';

const getSet = {
  get: () => ({}),
  set: () => ({}),
};

@Component()
export class Context {
  private $requestId: string;
  private store = getSet;

  public create(cb) {
    cb(getSet);
  }

  public set requestId(requestId: string) {
    this.$requestId = requestId;
  }

  public get requestId() {
    return this.$requestId;
  }
}
