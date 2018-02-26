import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

import { IGithubUser } from '../auth/helpers/IGithubUser';

@Entity()
export class User {
  public static fromGithub(user: IGithubUser) {
    return {
      avatar: user.avatar_url,
      email: user.email,
      login: user.login,
      name: user.name,
    };
  }

  @ObjectIdColumn() public id?: ObjectID;

  @Column() public avatar: string;

  @Column() public email: string;

  @Column({ unique: true })
  public login: string;

  @Column() public name: string;
}
