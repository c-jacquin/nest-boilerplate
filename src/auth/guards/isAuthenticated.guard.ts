import { CanActivate, Guard } from '@nestjs/common';
import { Request } from 'express';

@Guard()
export class IsAuthenticatedGuard implements CanActivate {
  public canActivate(req: Request): boolean {
    return !!req.user;
  }
}
