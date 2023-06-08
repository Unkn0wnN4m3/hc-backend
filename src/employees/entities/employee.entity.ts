import { Game } from 'src/games/entities/game.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @OneToOne(() => Game)
  @JoinColumn()
  game: Game;

  @OneToMany(() => Ticket, (ticket) => ticket.employee)
  ticked: Ticket[];
}
