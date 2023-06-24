import { ROLES } from 'src/const/role.enum';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  dni: number;

  @Column()
  phoneNumber: number;

  @Column({
    type: 'enum',
    enum: ROLES,
  })
  roles: ROLES;

  // NOTE: This property probably does not need to be included in the dto
  @OneToMany(() => Ticket, (ticket) => ticket.client)
  ticket: Ticket[];
}
