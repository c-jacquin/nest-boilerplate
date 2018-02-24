import { IsString } from 'class-validator';

export class GithubAuthDto {
  @IsString() public readonly code: string;
  @IsString() public readonly clientId: string;
}
