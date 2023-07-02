import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { Token } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [EmployeesModule, TypeOrmModule.forFeature([Token])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
