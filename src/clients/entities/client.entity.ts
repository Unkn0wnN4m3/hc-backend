import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dni: number;

  @Column()
  phoneNumber: number;

  // NOTE: This property probably does not need to be included in the dto
  @ManyToOne(() => Ticket, (ticket) => ticket.client)
  ticket: Ticket;
}
