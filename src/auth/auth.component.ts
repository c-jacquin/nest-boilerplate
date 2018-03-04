import {
  Component,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import { Env, Http, I18n } from '../_core';
import { User } from '../user';
import { GithubAuthDto } from './auth.dto';

interface IAuthResponse {
  user: User;
  token: string;
}

@Component()
export class AuthService {
  constructor(
    private env: Env,
    private http: Http,
    @Inject('I18n') private i18n: I18n,
  ) {}

  public async github({
    clientId,
    code,
  }: GithubAuthDto): Promise<IAuthResponse> {
    try {
      const result = await this.http.post(this.env.GITHUB_TOKEN_URI, {
        accept: 'json',
        client_id: clientId,
        client_secret: this.env.GITHUB_SECRET,
        code,
      });
      const token = result.data.split('=')[1].split('&')[0];

      const { data } = await this.http.get(this.env.GITHUB_API + '/user', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`,
        },
      });

      return {
        token,
        user: {
          avatar: data.avatar_url,
          email: data.email,
          login: data.login,
          name: data.name,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(
        this.i18n.translate('error.internal.github'),
        err,
      );
    }
  }
}
