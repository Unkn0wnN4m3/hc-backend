import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ROLES } from 'src/const/role.enum';

export class CreateClientDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  dni: number;

  @IsInt()
  @IsPositive()
  phoneNumber: number;

  @IsNotEmpty()
  @IsEnum(ROLES)
  roles: ROLES;
}
