import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

import { ROLES } from '../../const/role.enum';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  dni: number;

  @IsNotEmpty()
  @IsInt()
  phoneNumber: number;

  @IsNotEmpty()
  @IsEnum(ROLES)
  roles: ROLES;

  @IsUUID()
  gameId: string;
}
