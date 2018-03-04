import { Component } from '@nestjs/common';

@Component()
export class UserService {
  public async create() {
    return Promise.resolve({});
  }

  public async find() {
    return Promise.resolve([]);
  }

  public async findOne() {
    return Promise.resolve({});
  }

  public async findOneById() {
    return Promise.resolve({});
  }

  public async findOrCreate() {
    return Promise.resolve({});
  }
  public async remove() {
    return Promise.resolve({});
  }

  public async update() {
    return Promise.resolve({});
  }

  public async removeAll() {
    return Promise.resolve();
  }
}
