import { IsEmail, IsInt, IsNotEmpty, IsPositive, Max } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  fistName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  dni: number;

  @IsInt()
  @IsPositive()
  @Max(10)
  phoneNumber: number;
}
