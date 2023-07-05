import { Employee } from '../../employees/entities/employee.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToMany(() => Ticket, (ticket) => ticket.sale)
  ticket: Ticket[];

  //editadp, estaba andando
  @Column()
  employeeId: string;
  @ManyToOne(() => Employee, (employee) => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
