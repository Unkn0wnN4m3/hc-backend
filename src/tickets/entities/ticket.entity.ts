import { Client } from '../../clients/entities/client.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Game } from '../../games/entities/game.entity';
import { Sale } from '../../sales/entities/sale.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time' })
  hour: string;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @Column()
  employeeId: string;
  @ManyToOne(() => Employee, (employee) => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: string;

  @Column()
  gameId: string;
  @ManyToOne(() => Game, (game) => game.id)
  @JoinColumn({ name: 'game_id' })
  game: string;

  @Column()
  clientId: string;
  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: 'client_id' })
  client: string;

  @Column()
  saleId: string;
  @ManyToOne(() => Sale, (sale) => sale.id)
  @JoinColumn({ name: 'sale_id' })
  sale: string;
}
