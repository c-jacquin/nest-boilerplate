import { Component } from '@nestjs/common';

@Component()
export class Context {
  private $locale: string;
  private $requestId: string;
  public create(cb) {
    cb({
      set: () => ({}),
    });
  }

  public set locale(locale: string) {
    this.$locale = locale;
  }

  public get locale() {
    return this.$locale;
  }

  public set requestId(requestId: string) {
    this.$requestId = requestId;
  }

  public get requestId() {
    return this.$requestId;
  }
}
