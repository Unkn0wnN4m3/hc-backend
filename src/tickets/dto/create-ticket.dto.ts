import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsNotEmpty()
  @IsDate()
  date: string;

  @IsNotEmpty()
  @IsUUID()
  client: string;

  @IsNotEmpty()
  @IsUUID()
  sale: string;

  @IsNotEmpty()
  @IsUUID()
  employee: string;

  @IsNotEmpty()
  @IsUUID()
  game: string;
}
