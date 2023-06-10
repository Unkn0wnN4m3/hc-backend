import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';

const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();

export class CreateSaleDto {
  @IsInt()
  @Min(1)
  @Max(30)
  day: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(currentYear)
  year: number;

  @IsUUID()
  employee: Employee;
}
