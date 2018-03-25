import {
  Controller,
  Get,
  HttpStatus,
  Param,
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
import { RestrictRoles } from '../guards/restrictRoles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Account } from './account.entity';
import { Role } from './role.entity';

@Controller('api/role')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiUseTags('role')
export class RoleController {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  @Get()
  @RestrictRoles(Roles.ADMIN)
  @ApiResponse({
    description: 'The roles have been retrieved',
    isArray: true,
    status: 200,
    type: Role,
  })
  public async find(
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindManyQuery<Role>,
    @Response() res: ExpressResponse,
  ) {
    const { order, orderBy, ...otherOptions } = query;
    const options: any = otherOptions;

    if (order && orderBy) {
      options.order = {
        [orderBy]: order,
      };
    }

    const count = await this.roleRepository.count();
    const roles = !!query.ids
      ? await this.roleRepository.findByIds(query.ids)
      : await this.roleRepository.find(options);
    res.set('Content-Range', `role ${roles.length}/${count}`);
    res.json(roles);
  }

  @Get(':id')
  @RestrictRoles(Roles.ADMIN)
  @ApiResponse({
    description: 'The role has been retrieved',
    status: 200,
    type: Account,
  })
  @ApiResponse({
    description: 'The role has not been retrieved',
    status: 204,
  })
  public async findOne(
    @Param('id') id: string,
    @Query(new FindQueryPipe(), new ValidationPipe())
    query: FindOneQuery<Role>,
    @Response() res: ExpressResponse,
  ) {
    const role = await this.roleRepository.findOneById(id, query);

    if (!role) {
      res.status(HttpStatus.NO_CONTENT).json();
    } else {
      res.json(role);
    }
  }
}
