import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Game } from 'src/games/entities/game.entity';

import { ROLES } from '../entities/role.enum';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

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
  gameId: Game;
  /*
  @IsUUID()
  gameId: string;
  */
}
