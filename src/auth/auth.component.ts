import { Component } from '@nestjs/common';

import { Env } from '../_core/env';
import { Http } from '../_core/http';
import { User } from '../user';
import { GithubAuthDto } from './auth.dto';
import { IGithubUser } from './helpers/IGithubUser';

interface IAuthResponse<U> {
  user: U;
  token: string;
}

@Component()
export class AuthService {
  constructor(private env: Env, private http: Http) {}

  public async github({
    clientId,
    code,
  }: GithubAuthDto): Promise<IAuthResponse<IGithubUser>> {
    const result = await this.http.post(this.env.GITHUB_TOKEN_URI, {
      accept: 'json',
      client_id: clientId,
      client_secret: this.env.GITHUB_SECRET,
      code,
    });
    const token = result.data.split('=')[1].split('&')[0];

    const { data: user } = await this.http.get(this.env.GITHUB_API + '/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    });

    return { user, token };
  }
}
