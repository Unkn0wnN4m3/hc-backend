import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Game } from 'src/games/entities/game.entity';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsUUID()
  gameId: Game;
}
