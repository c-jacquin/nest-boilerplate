import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs/Observable';

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(req, context: ExecutionContext): boolean {
    const { parent, handler } = context;
    const roles = this.reflector.get<string[]>('roles', handler);
    if (!roles) {
      return true;
    }

    if (!req.user) {
      return false;
    }

    const account = req.user.account;
    const hasRole = () =>
      !!account.roles.find(
        role => !!roles.find(item => item.toUpperCase() === role),
      );

    return account && Array.isArray(account.roles) && hasRole();
  }
}
