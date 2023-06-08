import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  schedule: number;
}
