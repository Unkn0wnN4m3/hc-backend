import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee();
    employee.name = createEmployeeDto.name;
    employee.lastName = createEmployeeDto.lastName;
    employee.email = createEmployeeDto.email;
    employee.password = await hash(createEmployeeDto.password, 10);
    employee.dni = createEmployeeDto.dni;
    employee.phoneNumber = createEmployeeDto.phoneNumber;
    employee.isAdmin = createEmployeeDto.isAdmin;
    employee.game = createEmployeeDto.gameId;

    return await this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee[]> {
    return await this.employeeRepository.findBy({
      id,
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<any> {
    return await this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({
      id: id,
    });
    return await this.employeeRepository.remove(employee);
  }
}
