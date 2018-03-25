import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn() public id?: any;

  @Column({ unique: true })
  @IsString()
  @ApiModelProperty({
    description: 'name of the role',
    type: String,
  })
  public name: string;

  @OneToMany(type => Account, account => account.user, {
    cascadeInsert: true,
    cascadeUpdate: true,
  })
  public accounts?: Account[];
}
