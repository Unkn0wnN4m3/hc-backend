import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: number;

  @Column()
  hour: number;
}
