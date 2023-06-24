import { ROLES } from 'src/const/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

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
  })
  roles: ROLES;
}
