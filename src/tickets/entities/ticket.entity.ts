import { Client } from '../../clients/entities/client.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Game } from '../../games/entities/game.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //HORA COMO STRING, ES LA HORA DEL JUEGO, NO DEL TICKET
  @Column({ type: 'time' })
  hour: string;
  //tuEntidad.hora = '12:30
  //AGREAR HORA DE EMISION DEL TICKET??

  //DAY, MONT Y DATE EN UN SOLO TIPO FECHA
  @Column({ type: 'date' })
  date: Date;
  //DAY, MONT Y DATE EN UN SOLO TIPO FECHA
  //PONER RELACION SOLO EN LA VENTA?
  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @ManyToOne(() => Game, (game) => game.id)
  game: Game;

  @ManyToOne(() => Client, (client) => client.id)
  client: Client;

  @ManyToOne(() => Sale, (sale) => sale.id)
  sale: Sale;
}
