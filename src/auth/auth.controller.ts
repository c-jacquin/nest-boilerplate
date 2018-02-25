import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { ValidationPipe } from '../_core';
import { UserService } from '../user';
import { Auth } from './auth.component';
import { GithubAuthDto } from './auth.dto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private auth: Auth, private userService: UserService) {}

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
    const { user: githubUser, token } = await this.auth.github(body);
    const user = await this.userService.findOrCreate(githubUser);

    return { user, token };
  }
}
