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
import { IsAccountOwnerGuard } from '../guards/isAccountOwner.guard';
import { RestrictRoles } from '../guards/restrictRoles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Account } from './account.entity';

@Controller('api/account')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiUseTags('account')
export class AccountController {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  @Post()
  @RestrictRoles(Roles.ADMIN)
  @ApiResponse({
    description: 'The account has been created',
    status: 201,
    type: Account,
  })
  @ApiResponse({
    description:
      "One of the property of the body didn't pass the validation, error details on the message",
    status: 400,
  })
  public async create(
    @Body(new ValidationPipe())
    body: Account,
  ) {
    return this.accountRepository.save(body);
  }

  @Get()
  @RestrictRoles(Roles.ADMIN)
  @ApiResponse({
    description: 'The accounts have been retrieved',
    isArray: true,
    status: 200,
    type: Account,
  })
  public async find(
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindManyQuery<Account>,
    @Response() res: ExpressResponse,
  ) {
    const { order, orderBy, ...otherOptions } = query;
    const options: any = otherOptions;

    if (order && orderBy) {
      options.order = {
        [orderBy]: order,
      };
    }

    options.relations = ['role'];

    const count = await this.accountRepository.count();
    const accounts = Array.isArray(query.ids)
      ? await this.accountRepository.findByIds(query.ids)
      : await this.accountRepository.find(options);
    res.set('Content-Range', `account ${accounts.length}/${count}`);
    res.json(accounts);
  }

  @Get(':id')
  @UseGuards(IsAccountOwnerGuard)
  @ApiResponse({
    description: 'The account has been retrieved',
    status: 200,
    type: Account,
  })
  @ApiResponse({
    description: 'The account has not been retrieved',
    status: 204,
  })
  public async findOne(
    @Param('id') id: string,
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindOneQuery<Account>,
    @Response() res: ExpressResponse,
  ) {
    const user = await this.accountRepository.findOneById(id, query);

    if (!user) {
      res.status(HttpStatus.NO_CONTENT).json();
    } else {
      res.json(user);
    }
  }

  @Delete(':id')
  @UseGuards(IsAccountOwnerGuard)
  @ApiResponse({
    description: 'The account has been deleted',
    status: 200,
  })
  @ApiResponse({
    description: "The account doesn't exist",
    status: 204,
  })
  public async remove(
    @Param('id') id: string,
    @Response() res: ExpressResponse,
  ) {
    const value = await this.accountRepository.deleteById(id);

    if (value) {
      res.json();
    } else {
      res.status(HttpStatus.NO_CONTENT).json({});
    }
  }

  @Put(':id')
  @UseGuards(IsAccountOwnerGuard)
  @ApiResponse({
    description: 'The account has been updated',
    status: 200,
    type: Account,
  })
  @ApiResponse({
    description: "The account doesn't exist",
    status: 204,
  })
  @ApiResponse({
    description:
      "One of the property of the body didn't pass the validation, error details on the message",
    status: 400,
  })
  public async update(
    @Param('id') id: string,
    @Body(new ValidationPipe())
    account: Account,
    @Response() res: ExpressResponse,
  ) {
    const value = await this.accountRepository.update({ id }, account);

    if (value) {
      res.json();
    } else {
      res.status(HttpStatus.NO_CONTENT).json({});
    }
  }
}
