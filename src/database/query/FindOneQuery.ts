import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class FindOneQuery<Entity> {
  @IsArray()
  @IsOptional()
  @ApiModelProperty({
    description:
      'Specifies what columns should be retrieved (stringified array of entity keys)',
    required: false,
    type: String,
  })
  public readonly select?: Array<keyof Entity>;
}
