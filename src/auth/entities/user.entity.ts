import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from './account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() public id?: number;

  @Column()
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "the uri of the user's avatar",
    type: String,
  })
  public avatar?: string;

  @Column()
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: 'the email of the user',
    type: String,
  })
  public email?: string;

  @Column()
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: 'the name of the user',
    type: String,
  })
  public name?: string;

  @OneToMany(type => Account, account => account.user, {
    cascadeInsert: true,
    cascadeUpdate: true,
  })
  public accounts?: Account[];
}
