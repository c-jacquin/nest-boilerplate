import { CanActivate, Guard } from '@nestjs/common';

@Guard()
export class IsAuthenticatedGuard implements CanActivate {
  public canActivate(req: any): boolean {
    return !!req.user;
  }
}
