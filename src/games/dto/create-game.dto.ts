import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsPositive()
  @IsInt()
  gameStart: number;

  @IsPositive()
  @IsInt()
  gameEnd: number;

  @IsPositive()
  @IsInt()
  maxEntries: number;
}
