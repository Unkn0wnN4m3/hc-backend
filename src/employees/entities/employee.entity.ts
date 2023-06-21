import { Game } from '../../games/entities/game.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ROLES } from './role.enum';

@Entity({ name: 'employees' })
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

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.USER,
  })
  roles: ROLES;

  // NOTE: At least one game needs to be asigned to a new employee
  @ManyToOne(() => Game, (game) => game.id)
  game: Game;

  // NOTE: Maybe "ticket" column/property is not need to be included in employee dto
  @OneToMany(() => Ticket, (ticket) => ticket.employee)
  ticket: Ticket[];

  // NOTE: Maybe "sale" column/property is not need to be included in employee dto
  @OneToMany(() => Sale, (sale) => sale.employee)
  sale: Sale[];
}
