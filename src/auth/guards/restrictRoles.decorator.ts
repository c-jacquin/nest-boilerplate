import { ReflectMetadata } from '@nestjs/common';
import { Roles } from '../enums/Roles';

export const RestrictRoles = (...roles: Roles[]) =>
  ReflectMetadata('roles', roles);
