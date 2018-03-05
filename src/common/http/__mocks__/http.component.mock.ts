import { Component } from '@nestjs/common';

@Component()
export class Http {
  public delete(uri: string, config?: any) {
    return Promise.resolve({});
  }

  public get(uri: string, config?: any) {
    return Promise.resolve({});
  }

  public post(uri: string, body: any, config?: any) {
    return Promise.resolve({ data: 'foo=bar&foobar' });
  }

  public put(uri: string, body: any, config?: any) {
    return Promise.resolve({});
  }
}
