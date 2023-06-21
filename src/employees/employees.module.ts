import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Game } from 'src/games/entities/game.entity';
import { GamesService } from 'src/games/games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Game])],
  controllers: [EmployeesController],
  providers: [EmployeesService, GamesService],
})
export class EmployeesModule {}
