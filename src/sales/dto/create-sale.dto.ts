import { IsNotEmpty, IsUUID } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsUUID()
  employee: Employee;
}
