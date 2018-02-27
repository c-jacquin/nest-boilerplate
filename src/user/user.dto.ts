import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiModelProperty({
    description: "the uri of the user's avatar",
    type: String,
  })
  public readonly avatar: string;

  @IsString()
  @ApiModelProperty({
    description: 'the email of the user',
    type: String,
  })
  public readonly email?: string;

  @IsString()
  @ApiModelProperty({
    description: 'the name of the user',
    type: String,
  })
  public readonly name?: string;

  public readonly login?: string;
}
