import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GithubAuthDto {
  @IsString()
  @ApiModelProperty({
    description: 'github code obtain and send by the client',
    required: true,
    type: String,
  })
  public readonly code: string;

  @IsString()
  @ApiModelProperty({
    description: 'github id from the github app page send by the client',
    required: true,
    type: String,
  })
  public readonly clientId: string;
}
