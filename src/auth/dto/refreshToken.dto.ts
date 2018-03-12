import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @ApiModelProperty({
    description: 'token used to refresh the access token.',
    required: true,
    type: String,
  })
  public refreshToken: string;
}
