import { SetMetadata } from '@nestjs/common';
import { EMPLOYEE_KEY } from 'src/const/key-decorator';
import { ROLES } from 'src/const/role.enum';

export const EmployeeAccess = () => SetMetadata(EMPLOYEE_KEY, ROLES.EMPLOYEE);
