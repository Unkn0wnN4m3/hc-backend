import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
//import { hash } from 'bcrypt';
import { Game } from 'src/games/entities/game.entity';
import { GamesService } from 'src/games/games.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private readonly gameService: GamesService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const game = await this.gameService.findOneGame(createEmployeeDto.gameId);
      if (!game) {
        console.log('no encotro usuario,game: ' + game);
      }

      const employee = new Employee();
      employee.name = createEmployeeDto.name;
      employee.lastName = createEmployeeDto.lastName;
      employee.email = createEmployeeDto.email;
      employee.password = createEmployeeDto.password;
      // await hash(createEmployeeDto.password, 10);
      employee.dni = createEmployeeDto.dni;
      employee.phoneNumber = createEmployeeDto.phoneNumber;
      employee.roles = createEmployeeDto.roles;
      employee.game = game;

      /* Funcion hash contraseña*/

      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new Error(error);
    }
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
