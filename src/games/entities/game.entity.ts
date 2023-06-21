import { Employee } from '../../employees/entities/employee.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  schedule: string;

  @Column()
  maxEntries: number;

  @OneToMany(() => Ticket, (ticket) => ticket.game)
  ticket: Ticket[];

  @OneToMany(() => Employee, (employee) => employee.game)
  employee: Employee[];
}
