import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Game } from 'src/games/entities/game.entity';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  dni: number;

  @IsInt()
  phoneNumber: number;

  @IsBoolean()
  isAdmin: boolean;

  @IsUUID()
  gameId: Game;
}
