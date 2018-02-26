import { Component } from '@nestjs/common';

@Component()
export class UserService {
  public async findOrCreate(data: any) {
    return Promise.resolve({});
  }
}
