import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from './games/games.module';
import { TicketsModule } from './tickets/tickets.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    EmployeesModule,
    GamesModule,
    TicketsModule,
    ClientsModule,
    SalesModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}

/* Para las ventas. Opcion 1:
  Opcion 2:
  Crear venta al principio, retornar ID de la venta,
  por cada ticket creado (al confirmar pago), guardarlo con el id de la 
  venta.
  Al finalizar venta crearle la fecha y hora, crear nueva venta, retornar nuevo ID
  En front, si no existe el id de la venta, enviar solicitud automaticamente-

    Crear tickets (1 o muchos a la vez), columna "sale" en null.
  Por cada ticket/s retornar el ID del ticket.
  Al completar, enviar los IDs de los tickets crear la venta,
  y asignar a todos los tickets el id de la venta.
  Contra hay que buscar todos los tickets.

*/
