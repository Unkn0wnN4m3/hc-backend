import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}
