import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() public _id?: ObjectID;

  @Column()
  @IsString()
  @ApiModelProperty({
    description: "the uri of the user's avatar",
    type: String,
  })
  public avatar?: string;

  @Column()
  @IsString()
  @ApiModelProperty({
    description: 'the email of the user',
    type: String,
  })
  public email?: string;

  @Column()
  @IsString()
  @ApiModelProperty({
    description: 'the name of the user',
    type: String,
  })
  public name?: string;

  @Column({ unique: true })
  public login?: string;
}
