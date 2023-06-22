import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @IsUUID()
  saleId: string;

  @IsNotEmpty()
  @IsUUID()
  employeeId: string;

  @IsNotEmpty()
  @IsUUID()
  gameId: string;
}
