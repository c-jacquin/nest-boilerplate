import { Component, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { I18n } from '../_core';
import { IGithubUser } from '../auth/helpers/IGithubUser';
import { User } from './user.entity';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private i18n: I18n,
  ) {}

  public async findOrCreate(data: IGithubUser) {
    try {
      let user = await this.userRepository.findOne({ login: data.login });
      if (!user) {
        user = await this.userRepository.save(User.fromGithub(data));
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException(
        this.i18n.translate('error.internal.database'),
        err,
      );
    }
  }

  public async removeAll() {
    return this.userRepository.clear();
  }
}
