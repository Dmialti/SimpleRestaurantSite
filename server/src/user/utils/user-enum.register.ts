import { registerEnumType } from '@nestjs/graphql';
import { Role } from '../../../prisma/generated/prisma/enums';

export function registerUserEnums() {
  registerEnumType(Role, { name: 'Role' });
}
