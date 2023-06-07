import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Employee],
      synchronize: true,
    }),
    EmployeesModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
