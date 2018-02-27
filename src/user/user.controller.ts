import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { ObjectID } from 'mongodb';

import { I18n } from '../_core';
import { UserService } from './user.component';
import { UserDto } from './user.dto';

@Controller('user')
@ApiUseTags('user')
export class UserController {
  constructor(private userService: UserService, private i18n: I18n) {}

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
    body: UserDto,
  ) {
    return this.userService.create(body);
  }

  @Get()
  @ApiResponse({
    description: 'The users have been retrieved',
    status: 200,
  })
  public async find() {
    return this.userService.find();
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
    @Param('id') id: string,
    @Response() res: ExpressResponse,
  ) {
    const user = await this.userService.findOneById(id);

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
    @Param('id') id: string,
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
    @Param('id') id: string,
    @Response() res: ExpressResponse,
    @Body(new ValidationPipe())
    userDto: UserDto,
  ) {
    const value = await this.userService.update({ _id: ObjectID(id) }, userDto);
    if (value) {
      res.json();
    } else {
      res.status(HttpStatus.NO_CONTENT).json();
    }
  }
}
