import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from 'src/const/key-decorator';
import { ROLES } from 'src/const/role.enum';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
