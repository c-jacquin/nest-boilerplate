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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Response as ExpressResponse } from 'express';
import { Repository } from 'typeorm';

import { ValidationPipe } from '../../common';
import { FindManyQuery, FindOneQuery, FindQueryPipe } from '../../database';
import { Roles } from '../enums/Roles';
import { IsUserOwnerGuard } from '../guards/isUserOwner.guard';
import { RestrictRoles } from '../guards/restrictRoles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Account } from './account.entity';
import { User } from './user.entity';

@Controller('api/user')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiUseTags('user')
export class UserController {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Post()
  @RestrictRoles(Roles.ADMIN)
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
  @RestrictRoles(Roles.ADMIN)
  @ApiResponse({
    description: 'The users have been retrieved',
    isArray: true,
    status: 200,
    type: User,
  })
  public async find(
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindManyQuery<User>,
    @Response() res: ExpressResponse,
  ) {
    const { order, orderBy, ...otherOptions } = query;
    const options: any = otherOptions;

    if (order && orderBy) {
      options.order = {
        [orderBy]: order,
      };
    }

    const count = await this.userRepository.count();
    const users = await this.userRepository.find(options);
    res.set('Content-Range', `${users.length}/${count}`);
    res.json(users);
  }

  @Get(':id')
  @UseGuards(IsUserOwnerGuard)
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
  @UseGuards(IsUserOwnerGuard)
  @ApiResponse({
    description: 'The user has been deleted',
    status: 200,
  })
  @ApiResponse({
    description: "The user doesn't exist",
    status: 204,
  })
  public async remove(@Param('id') id: string) {
    const user = await this.userRepository.findOneById(id, {
      relations: ['accounts'],
    });
    if (user && Array.isArray(user.accounts)) {
      for (const account of user.accounts) {
        await this.accountRepository.deleteById(account.id);
      }
    }
    return this.userRepository.deleteById(id);
  }

  @Put(':id')
  @UseGuards(IsUserOwnerGuard)
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
    await this.userRepository.update({ id }, user);
    return {};
  }
}
