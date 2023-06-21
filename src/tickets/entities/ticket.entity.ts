import { Client } from '../../clients/entities/client.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Game } from '../../games/entities/game.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hour: number;

  @Column()
  day: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @ManyToOne(() => Game, (game) => game.id)
  game: Game;

  @ManyToOne(() => Client, (client) => client.id)
  client: Client;

  @ManyToOne(() => Sale, (sale) => sale.id)
  sale: Sale;
}
