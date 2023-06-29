import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { EmployeesModule } from 'src/employees/employees.module';

@Global()
@Module({
  imports: [EmployeesModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
