import { Employee } from '../../employees/entities/employee.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  // ESTA ES LA HORA EN LA QUE SE REALIZO LA VENTA TOTAL
  @Column({ type: 'time', nullable: true })
  completedAt: string;

  // NOTE: This property probably does not need to be included in the dto
  @OneToMany(() => Ticket, (ticket) => ticket.sale)
  ticket: Ticket[];

  // WARN: This need to be implemented in the dto
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;
}
