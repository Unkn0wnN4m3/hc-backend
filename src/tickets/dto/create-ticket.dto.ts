import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { Client } from 'src/clients/entities/client.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Game } from 'src/games/entities/game.entity';
import { Sale } from 'src/sales/entities/sale.entity';

const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();

export class CreateTicketDto {
  @IsInt()
  @Min(1)
  @Max(24)
  hour: number;

  @IsInt()
  @Min(1)
  @Max(30)
  day: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(currentYear)
  year: number;

  @IsUUID()
  clientId: Client;

  @IsUUID()
  saleId: Sale;

  @IsUUID()
  employeeId: Employee;

  @IsUUID()
  gameId: Game;
}
