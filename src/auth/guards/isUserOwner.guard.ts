import { CanActivate, Guard } from '@nestjs/common';

import { Roles } from '../enums/Roles';

@Guard()
export class IsUserOwnerGuard implements CanActivate {
  public canActivate(req: any): boolean {
    const isAdmin = () => {
      return req.user.account.role.name === Roles.ADMIN;
    };

    return (
      !!req.user && (req.user.id.toString() === req.params.id || isAdmin())
    );
  }
}
