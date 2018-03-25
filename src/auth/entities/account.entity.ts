import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './role.entity';
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
  @ApiModelPropertyOptional({
    description: 'the provider of the account',
    type: String,
  })
  public provider?: string;

  @Column()
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({
    description:
      'the refresh token is used to get a new access token when it expire',
    type: String,
  })
  public refreshToken?: string;

  @ApiModelProperty({
    description: 'the role associated with this account',
    type: Role,
  })
  @ManyToOne(type => Role, role => role.accounts, {
    cascadeInsert: true,
    cascadeRemove: true,
    cascadeUpdate: true,
  })
  public role: Role;

  @Column() public roleId?: string;

  @ApiModelProperty({
    description: 'the user who own this account',
    type: User,
  })
  @ManyToOne(type => User, user => user.accounts, {
    cascadeInsert: true,
    cascadeRemove: true,
    cascadeUpdate: true,
  })
  public user: User;

  @Column() public userId?: string;
}
