import { CanActivate, Guard } from '@nestjs/common';
import { Request } from 'express';

import { Roles } from '../enums/Roles';

@Guard()
export class IsAccountOwnerGuard implements CanActivate {
  public canActivate(req: Request): boolean {
    const isAdmin = () => {
      return !!req.user.account.roles.find(role => role === Roles.ADMIN);
    };

    return req.user && (req.user.account.id === req.params.id || isAdmin());
  }
}
