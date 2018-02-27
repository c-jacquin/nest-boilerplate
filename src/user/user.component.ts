import { Component, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneAndReplaceOption,
  FindOneOptions,
  MongoRepository,
  ObjectLiteral,
  RemoveOptions,
  SaveOptions,
} from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

import { DatabaseException, I18n } from '../_core';
import { IGithubUser } from '../auth/helpers/IGithubUser';
import { User } from './user.entity';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private i18n: I18n,
  ) {}

  public async create(entity: User, options?: SaveOptions) {
    try {
      return await this.userRepository.save(entity, options);
    } catch (err) {
      throw new DatabaseException(err);
    }
  }

  public async find(options?: FindManyOptions<User>) {
    try {
      return await this.userRepository.find(options);
    } catch (err) {
      throw new DatabaseException(err);
    }
  }

  public async findOne(options: FindOneOptions<User>) {
    try {
      return await this.userRepository.findOne(options);
    } catch (err) {
      throw new DatabaseException(err);
    }
  }

  public async findOneById(id, options?: FindOneOptions<User> | Partial<User>) {
    try {
      return await this.userRepository.findOneById(id, options);
    } catch (err) {
      throw new DatabaseException(err);
    }
  }

  public async findOrCreate(data: DeepPartial<User> | IGithubUser) {
    let user = await this.findOne({
      where: {
        login: data.login,
      },
    });
    if (!user) {
      user = await this.create(User.fromGithub(data as IGithubUser));
    }
    return user;
  }

  public async remove(id: string, options?: any) {
    try {
      const user = await this.findOneById(id);

      return await this.userRepository.remove(user, options);
    } catch (err) {
      throw new DatabaseException(err);
    }
  }

  public async update(
    condition: Partial<User>,
    partialEntity: DeepPartial<User>,
    options?: FindOneAndReplaceOption,
  ) {
    try {
      return await this.userRepository.findOneAndUpdate(
        condition,
        partialEntity,
        options,
      );
    } catch (err) {
      throw new DatabaseException(err);
    }
  }

  public async removeAll() {
    try {
      return await this.userRepository.clear();
    } catch (err) {
      throw new DatabaseException(err);
    }
  }
}
