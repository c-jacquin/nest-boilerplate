import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidationPipe } from '../_core';
import { Auth } from './auth.component';
import { GithubAuthDto } from './auth.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: Auth,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post('github')
  public async githubAuth(
    @Body(new ValidationPipe())
    body: GithubAuthDto,
  ) {
    const { user, token } = await this.auth.github(body);
    await this.userRepository.save(new User(user));

    return { user, token };
  }
}
