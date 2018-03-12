import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Response,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Response as ExpressResponse } from 'express';
import { Repository } from 'typeorm';

import { ValidationPipe } from '../../common';
import { FindManyQuery, FindOneQuery, FindQueryPipe } from '../../database';
import { User } from './user.entity';

@Controller('user')
@ApiUseTags('user')
export class UserController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Post()
  @ApiResponse({
    description: 'The user has been created',
    status: 201,
    type: User,
  })
  @ApiResponse({
    description:
      "One of the property of the body didn't pass the validation, error details on the message",
    status: 400,
  })
  public async create(
    @Body(new ValidationPipe())
    body: User,
  ) {
    return this.userRepository.save(body);
  }

  @Get()
  @ApiResponse({
    description: 'The users have been retrieved',
    isArray: true,
    status: 200,
    type: User,
  })
  public async find(
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindManyQuery<User>,
  ) {
    const { order, orderBy, ...otherOptions } = query;
    const options: any = otherOptions;

    if (order && orderBy) {
      options.order = {
        [orderBy]: order,
      };
    }

    return this.userRepository.find(options);
  }

  @Get(':id')
  @ApiResponse({
    description: 'The user has been retrieved',
    status: 200,
    type: User,
  })
  @ApiResponse({
    description: 'The user has not been retrieved',
    status: 204,
  })
  public async findOne(
    @Param('id') id: string,
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindOneQuery<User>,
    @Response() res: ExpressResponse,
  ) {
    const user = await this.userRepository.findOneById(id, query);

    if (!user) {
      res.status(HttpStatus.NO_CONTENT).json();
    } else {
      res.json(user);
    }
  }

  @Delete(':id')
  @ApiResponse({
    description: 'The user has been deleted',
    status: 200,
  })
  @ApiResponse({
    description: "The user doesn't exist",
    status: 204,
  })
  public async remove(@Param('id') id: string) {
    return this.userRepository.deleteById(id);
  }

  @Put(':id')
  @ApiResponse({
    description: 'The user has been updated',
    status: 200,
    type: User,
  })
  @ApiResponse({
    description: "The user doesn't exist",
    status: 204,
  })
  @ApiResponse({
    description:
      "One of the property of the body didn't pass the validation, error details on the message",
    status: 400,
  })
  public async update(
    @Param('id') id: number,
    @Body(new ValidationPipe())
    user: User,
  ) {
    return this.userRepository.update({ id }, user);
  }
}
