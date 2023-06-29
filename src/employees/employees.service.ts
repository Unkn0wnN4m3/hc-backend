import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Game } from 'src/games/entities/game.entity';
import { GamesService } from 'src/games/games.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private readonly gameService: GamesService,
  ) {}

  async createEmployee(body: CreateEmployeeDto): Promise<Employee> {
    try {
      const game = await this.gameService.findOneGame(body.gameId);
      if (!game) {
        // Implementar trw error
        console.log('no encotro usuario,game: ' + game);
      }
      const employee = new Employee();
      employee.firstName = body.firstName;
      employee.lastName = body.lastName;
      employee.email = body.email;
      employee.password = await bcrypt.hash(
        body.password,
        +process.env.HASH_SALT,
      );
      employee.dni = body.dni;
      employee.phoneNumber = body.phoneNumber;
      employee.roles = body.roles;
      employee.game = game;

      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createAdmin(body: CreateAdminDto): Promise<Employee> {
    try {
      const password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      const admin = { ...body, password: password, game: null };
      return await this.employeeRepository.save(admin);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    return await this.employeeRepository.findOneBy({
      id,
    });
  }

  async findBy({ key, value }: { key: keyof Employee; value: any }) {
    try {
      const employee: Employee = await this.employeeRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();
      return employee;
    } catch (error) {
      throw new Error(error.message);
    }
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
