import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Roles } from '../enums/Roles';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn() public id?: any;

  @Column({ unique: true })
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: 'the login of the account',
    type: String,
  })
  public login?: string;

  @Column()
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: 'the password of the account',
    type: String,
  })
  public password?: string;

  @Column()
  @IsString()
  @IsOptional()
  public provider?: number;

  @Column()
  @IsString()
  @IsOptional()
  public refreshToken?: string;

  @Column('simple-array') public roles: Roles[];

  @ManyToOne(type => User, user => user.accounts, {
    cascadeInsert: true,
    cascadeRemove: true,
    cascadeUpdate: true,
  })
  public user: User;
}
