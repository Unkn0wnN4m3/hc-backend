import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  schedule: number;

  @OneToMany(() => Ticket, (ticket) => ticket.game)
  ticket: Ticket[];
}
