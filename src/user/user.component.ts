import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IGithubUser } from '../auth/helpers/IGithubUser';
import { User } from './user.entity';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findOrCreate(data: IGithubUser) {
    let user = await this.userRepository.findOne({ login: data.login });

    if (!user) {
      user = await this.userRepository.save(new User(data));
    }

    return user;
  }
}
