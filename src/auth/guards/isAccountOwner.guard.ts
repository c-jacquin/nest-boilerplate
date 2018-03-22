import { CanActivate, Guard } from '@nestjs/common';

import { Roles } from '../enums/Roles';

@Guard()
export class IsAccountOwnerGuard implements CanActivate {
  public canActivate(req: any): boolean {
    const isAdmin = () => {
      return !!req.user.account.roles.find(role => role === Roles.ADMIN);
    };

    return req.user && (req.user.account.id === req.params.id || isAdmin());
  }
}
