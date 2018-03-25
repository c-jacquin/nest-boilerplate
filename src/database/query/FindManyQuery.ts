import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { FindOneQuery } from './FindOneQuery';

export class FindManyQuery<Entity> extends FindOneQuery<Entity> {
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: 'Property of the entity used for ordering.',
    required: false,
    type: String,
  })
  public readonly orderBy?: keyof Entity;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: 'ASC or DESC',
    required: false,
    type: String,
  })
  public readonly order?: 'ASC' | 'DESC';

  @IsNumber()
  @IsOptional()
  @ApiModelProperty({
    description: 'the amount of entity to skip (pagination)',
    required: false,
    type: Number,
  })
  public skip?: number;

  @IsNumber()
  @IsOptional()
  @ApiModelProperty({
    description: 'the amount of entity to retrieve',
    required: false,
    type: Number,
  })
  public take?: number;

  @ValidateNested()
  @IsOptional()
  @ApiModelProperty({
    description: 'stringified mongodb query filters',
    required: false,
    type: String,
  })
  public readonly where?: Entity;

  @IsJSON()
  @IsOptional()
  @ApiModelProperty({
    description: 'list of id to retrieve',
    required: false,
    type: String,
  })
  public readonly ids?: string[];
}
