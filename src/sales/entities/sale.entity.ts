import { Employee } from 'src/employees/entities/employee.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: number;

  @Column()
  hour: number;

  // NOTE: This property probably does not need to be included in the dto
  @OneToMany(() => Ticket, (ticket) => ticket.sale)
  ticket: Ticket;

  // WARN: This need to be implemented in the dto
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;
}
