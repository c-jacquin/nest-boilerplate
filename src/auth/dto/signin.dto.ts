import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @ApiModelProperty({
    description: "account's login",
    required: true,
    type: String,
  })
  public login: string;

  @IsString()
  @ApiModelProperty({
    description: "acount's password",
    required: true,
    type: String,
  })
  public password: string;
}
