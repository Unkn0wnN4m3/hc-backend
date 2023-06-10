import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fistName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  dni: number;

  @Column()
  phoneNumber: number;

  // NOTE: This property probably does not need to be included in the dto
  @OneToMany(() => Ticket, (ticket) => ticket.client)
  ticket: Ticket[];
}
