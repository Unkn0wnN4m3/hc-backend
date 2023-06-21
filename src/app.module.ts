import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { GamesModule } from './games/games.module';
import { Game } from './games/entities/game.entity';
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from './tickets/entities/ticket.entity';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { Sale } from './sales/entities/sale.entity';
import { Client } from './clients/entities/client.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
/* cambiar host: al nombre del servicio en el docker compose del base de datso */
/* TODO instalar morgan para logg */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysecretpassword',
      database: 'hackacode',
      entities: [Employee, Game, Ticket, Sale, Client],
      // synchronize: true,
    }),
    EmployeesModule,
    GamesModule,
    TicketsModule,
    ClientsModule,
    SalesModule,
    AuthModule,
  ],
})
export class AppModule {}
