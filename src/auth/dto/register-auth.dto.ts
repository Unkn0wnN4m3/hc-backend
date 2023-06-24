import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ROLES } from 'src/const/role.enum';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsPositive()
  @IsInt()
  dni: number;

  @IsPositive()
  @IsInt()
  phoneNumber: number;

  @IsOptional()
  @IsEnum(ROLES)
  roles: ROLES;
}
