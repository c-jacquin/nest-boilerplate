import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InternalErrorFilter } from '../../common';
import { Account } from '../entities/account.entity';
import { User } from '../entities/user.entity';
import { TokenService } from '../services/token.component';
import { GithubAuthDto } from './dto';
import { GithubService } from './github.component';

@Controller('auth')
@ApiUseTags('auth')
export class ProvidersController {
  constructor(
    private githubService: GithubService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private tokenService: TokenService,
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
    const {
      account: githubAccount,
      user: githubUser,
      providerToken,
    } = await this.githubService.auth(body);
    let user = await this.userRepository.findOne(githubUser);
    if (!user) {
      user = await this.userRepository.create(user);
      githubAccount.user = user;
    }
    githubAccount.refreshToken = this.tokenService.createRefreshToken();

    let account = await this.accountRepository.findOne({
      login: githubAccount.login,
    });
    if (!account) {
      account = await this.accountRepository.save(githubAccount);
    }
    const token = await this.tokenService.createAccessToken(account);

    return { providerToken, user, token };
  }
}
