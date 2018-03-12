import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn() public id?: any;

  @Column({ unique: true })
  public login?: string;

  @Column() public password?: string;

  @Column() public provider?: string;

  @Column() public refreshToken?: string;

  @ManyToOne(type => User, user => user.accounts, {
    cascadeInsert: true,
    cascadeUpdate: true,
  })
  public user: User;
}
