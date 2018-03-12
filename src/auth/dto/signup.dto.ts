import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { SigninDto } from './signin.dto';

export class SignupDto extends SigninDto {
  @IsEmail()
  @ApiModelProperty({
    description: 'email of the user',
    required: true,
    type: String,
  })
  public email: string;
}
