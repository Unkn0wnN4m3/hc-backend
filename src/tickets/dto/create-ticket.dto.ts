import { IsNotEmpty, IsUUID } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';
import { Game } from 'src/games/entities/game.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  clientName: string;

  @IsUUID()
  employeeId: Employee;

  @IsUUID()
  gameId: Game;
}
