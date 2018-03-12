import { Component } from '@nestjs/common';

@Component()
export class TokenService {
  public createAccessToken(): Promise<string> {
    return Promise.resolve('token');
  }

  public parse(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public createRefreshToken() {
    return 'refreshToken';
  }
}
