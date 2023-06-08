import { Employee } from 'src/employees/entities/employee.entity';
import { Game } from 'src/games/entities/game.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientName: string;

  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @ManyToOne(() => Game, (game) => game.id)
  game: Game;
}
