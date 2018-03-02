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
import { Response as ExpressResponse } from 'express';
import { ObjectID } from 'mongodb';

import {
  FindManyQuery,
  FindOneQuery,
  FindQueryPipe,
  ObjectIDPipe,
  ValidationPipe,
} from '../_core';
import { UserService } from './user.component';
import { User } from './user.entity';

@Controller('user')
@ApiUseTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiResponse({
    description: 'The user has been created',
    status: 201,
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
    return this.userService.create(body);
  }

  @Get()
  @ApiResponse({
    description: 'The users have been retrieved',
    status: 200,
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

    return this.userService.find(options);
  }

  @Get(':id')
  @ApiResponse({
    description: 'The user has been retrieved',
    status: 200,
  })
  @ApiResponse({
    description: 'The user has not been retrieved',
    status: 204,
  })
  public async findOne(
    @Param('id', new ObjectIDPipe())
    id: string,
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindOneQuery<User>,
    @Response() res: ExpressResponse,
  ) {
    const user = await this.userService.findOneById(id, query);

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
  public async remove(
    @Param('id', new ObjectIDPipe())
    id: string,
    @Response() res: ExpressResponse,
  ) {
    const value = await this.userService.remove(id);

    if (value) {
      res.json();
    } else {
      res.status(HttpStatus.NO_CONTENT).json();
    }
  }

  @Put(':id')
  @ApiResponse({
    description: 'The user has been updated',
    status: 200,
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
    @Param('id', new ObjectIDPipe())
    id: string,
    @Response() res: ExpressResponse,
    @Body(new ValidationPipe())
    user: User,
  ) {
    const value = await this.userService.update({ _id: ObjectID(id) }, user);

    if (value) {
      res.json();
    } else {
      res.status(HttpStatus.NO_CONTENT).json();
    }
  }
}
