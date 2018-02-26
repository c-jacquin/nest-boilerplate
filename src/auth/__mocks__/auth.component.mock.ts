import { Component } from '@nestjs/common';

import { GithubAuthDto } from '../auth.dto';
import { IGithubUser } from '../helpers/IGithubUser';

interface IAuthResponse<U> {
  user: U;
  token: string;
}

@Component()
export class AuthService {
  public async github({
    clientId,
    code,
  }: GithubAuthDto): Promise<IAuthResponse<{}>> {
    return Promise.resolve({ user: {}, token: '' });
  }
}
