import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  schedule: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  maxEntries: number;
}
