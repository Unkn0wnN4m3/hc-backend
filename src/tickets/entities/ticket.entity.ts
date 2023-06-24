import { Client } from '../../clients/entities/client.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Game } from '../../games/entities/game.entity';
import { Sale } from '../../sales/entities/sale.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  date: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  //tiopos a original EMployee
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: string;

  @ManyToOne(() => Game, (game) => game.id)
  game: string;

  @ManyToOne(() => Client, (client) => client.id)
  client: string;

  @ManyToOne(() => Sale, (sale) => sale.id)
  sale: string;
}
