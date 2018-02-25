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
  @ObjectIdColumn() public id: ObjectID;

  @Column() public avatar: string;

  @Column() public email: string;

  @Column({ unique: true })
  public login: string;

  @Column() public name: string;

  constructor(user: IGithubUser) {
    this.avatar = user.avatar_url;
    this.email = user.email;
    this.login = user.login;
    this.name = user.name;
  }
}
