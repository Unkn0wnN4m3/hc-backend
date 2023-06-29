import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/const/key-decorator';
import { ROLES } from 'src/const/role.enum';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
