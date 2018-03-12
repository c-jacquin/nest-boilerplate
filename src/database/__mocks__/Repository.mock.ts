import { Component } from '@nestjs/common';

@Component()
export class Repository {
  public create(): Promise<any> {
    return Promise.resolve({ id: '1' });
  }

  public deleteById(): Promise<any> {
    return Promise.resolve();
  }

  public find(): Promise<any> {
    return Promise.resolve([{ id: '1' }]);
  }

  public findOne(): Promise<any> {
    return Promise.resolve({ id: '1' });
  }

  public findOneById(): Promise<any> {
    return Promise.resolve({ id: '1' });
  }

  public save(): Promise<any> {
    return Promise.resolve({ id: '1' });
  }

  public clear(): Promise<any> {
    return Promise.resolve();
  }

  public update(): Promise<any> {
    return Promise.resolve({ id: '1' });
  }
}
