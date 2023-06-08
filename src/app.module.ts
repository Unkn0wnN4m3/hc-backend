import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { GamesModule } from './games/games.module';
import { Game } from './games/entities/game.entity';
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from './tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Employee, Game, Ticket],
      synchronize: true,
    }),
    EmployeesModule,
    GamesModule,
    TicketsModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
