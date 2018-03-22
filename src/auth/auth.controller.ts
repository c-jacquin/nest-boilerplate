import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidationPipe } from '../common';
import { RefreshTokenDto, SigninDto, SignupDto } from './dto';
import { Account } from './entities/account.entity';
import { User } from './entities/user.entity';
import { Roles } from './enums/Roles';
import { PasswordService } from './services/password.component';
import { TokenService } from './services/token.component';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  @Post('signin')
  public async signin(
    @Body(new ValidationPipe())
    body: SigninDto,
  ) {
    const account = await this.passwordService.authenticateAccount(
      body.login,
      body.password,
    );
    const refreshToken = this.tokenService.createRefreshToken();
    await this.accountRepository.update({ id: account.id }, { refreshToken });
    delete account.password;
    const accessToken = await this.tokenService.createAccessToken({
      ...account,
      refreshToken,
    });

    return {
      accessToken,
      account,
      refreshToken,
    };
  }

  @Post('signup')
  public async signup(
    @Body(new ValidationPipe())
    body: SignupDto,
  ) {
    const { login, password, ...userData } = body;
    const refreshToken = this.tokenService.createRefreshToken();
    const user = await this.userRepository.save(userData);
    const hashedPassword = await this.passwordService.hash(password);

    const account = await this.accountRepository.save({
      login,
      password: hashedPassword,
      refreshToken,
      roles: [Roles.PEON],
      user,
    });

    const accessToken = await this.tokenService.createAccessToken(account);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  @Post('refresh')
  public async refreshToken(
    @Body(new ValidationPipe())
    body: RefreshTokenDto,
  ) {
    const account = await this.accountRepository.findOne({
      where: body,
    });
    if (!account) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.tokenService.createAccessToken(account),
    };
  }
}
