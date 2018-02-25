import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidationPipe } from '../_core';
import { Auth } from './auth.component';
import { GithubAuthDto } from './auth.dto';
import { User } from './user.entity';

@Controller('auth')
@ApiUseTags('auth', 'github')
export class AuthController {
  constructor(
    private auth: Auth,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post('github')
  @ApiResponse({
    description:
      'The user is authenticated via github oAuth2, a record is persisted and the githud and the record are send back to the client',
    status: 201,
  })
  public async githubAuth(
    @Body(new ValidationPipe())
    body: GithubAuthDto,
  ) {
    const { user, token } = await this.auth.github(body);
    await this.userRepository.save(new User(user));

    return { user, token };
  }
}
