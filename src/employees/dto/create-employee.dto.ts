import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Game } from 'src/games/entities/game.entity';
import { Role } from '../entities/role.enum';

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

  @IsNotEmpty()
  roles: Role[];

  @IsUUID()
  gameId: Game;
}
