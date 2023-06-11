import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
