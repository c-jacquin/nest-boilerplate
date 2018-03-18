import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Account } from '../entities/account.entity';

@Guard()
export class IsAuthenticatedGuard implements CanActivate {
  public canActivate(req: Request): boolean {
    return !!req.user;
  }
}
