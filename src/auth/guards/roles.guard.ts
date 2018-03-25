import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../entities/role.entity';

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(req, context: ExecutionContext): boolean {
    const { handler } = context;
    const roles = this.reflector.get<string[]>('roles', handler);
    if (!roles) {
      return true;
    }

    if (!req.user) {
      return false;
    }

    const account = req.user.account;
    const hasRole = () => {
      return !!roles.find(item => {
        return item.toUpperCase() === account.role.name;
      });
    };

    return !!account && !!account.role && hasRole();
  }
}
