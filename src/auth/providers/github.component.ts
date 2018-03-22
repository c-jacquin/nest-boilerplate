import {
  Component,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

import { Env, Http, I18n } from '../../common';
import { AuthProviders } from '../enums/AuthProviders';
import { Roles } from '../enums/Roles';
import { GithubAuthDto } from './dto';
import { AuthResponse } from './interfaces/AuthResponse';
import { GithubUser } from './interfaces/GithubUser';

@Component()
export class GithubService {
  constructor(
    private env: Env,
    private http: Http,
    @Inject('I18n') private i18n: I18n,
  ) {}

  public async auth({ clientId, code }: GithubAuthDto): Promise<AuthResponse> {
    try {
      const providerToken = await this.getToken(clientId, code);
      const githubUser = await this.getUser(providerToken);

      return {
        account: {
          login: githubUser.login,
          provider: AuthProviders.GITHUB,
          roles: [Roles.PEON],
          user: {},
        },
        providerToken,
        user: {
          avatar: githubUser.avatar_url,
          email: githubUser.email,
          name: githubUser.name,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(
        this.i18n.translate('error.internal.github'),
        err,
      );
    }
  }

  public async getToken(clientId: string, code: string): Promise<string> {
    const result = await this.http.post(this.env.GITHUB_TOKEN_URI, {
      accept: 'json',
      client_id: clientId,
      client_secret: this.env.GITHUB_SECRET,
      code,
      redirect_uri: 'http://www.google.fr',
    });
    return result.data.split('=')[1].split('&')[0];
  }

  public async getUser(token: string): Promise<GithubUser> {
    const { data } = await this.http.get(this.env.GITHUB_API + '/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    });
    return data;
  }
}
