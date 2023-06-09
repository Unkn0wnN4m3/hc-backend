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
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  dni: number;

  @Column()
  phoneNumber: number;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @OneToOne(() => Game)
  @JoinColumn()
  game: Game;

  // NOTE: "ticket" column/property is not included in employee dto
  @OneToMany(() => Ticket, (ticket) => ticket.employee)
  ticket: Ticket[];
}
