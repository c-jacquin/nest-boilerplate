import {
  Body,
  Controller,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { InternalErrorFilter } from '../_core';
import { UserService } from '../user';
import { AuthService } from './auth.component';
import { GithubAuthDto } from './auth.dto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('github')
  @ApiResponse({
    description:
      'The user is authenticated via github oAuth2, a record is persisted and the githud and the record are send back to the client',
    status: 201,
  })
  @ApiResponse({
    description:
      "One of the property of the body didn't pass the validation, error details on the message",
    status: 400,
  })
  public async githubAuth(
    @Body(new ValidationPipe())
    body: GithubAuthDto,
  ) {
    const { user: githubUser, token } = await this.authService.github(body);
    const user = await this.userService.findOrCreate(githubUser);

    return { user, token };
  }
}
