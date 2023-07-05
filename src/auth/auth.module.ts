import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { Token } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from 'src/games/games.module';
import { Game } from 'src/games/entities/game.entity';

@Global()
@Module({
  imports: [
    EmployeesModule,
    GamesModule,
    TypeOrmModule.forFeature([Token, Game]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
