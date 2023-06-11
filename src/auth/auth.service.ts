import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee) private userRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const findUser = await this.userRepository.findOneBy({
      email,
    });

    if (!findUser)
      throw new HttpException('Incorrect password/user', HttpStatus.FORBIDDEN);

    const checkPasswork = await compare(password, findUser.password);

    if (!checkPasswork)
      throw new HttpException('Incorrect password/user', HttpStatus.FORBIDDEN);

    const payload = {
      sub: findUser.id,
      email: findUser.email,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      name: findUser.name,
      lastName: findUser.lastName,
      AuthToken: token,
    };

    return data;
  }

  async registerUser(registerAuthDto: RegisterAuthDto) {
    const user = new Employee();
    user.name = registerAuthDto.firstName;
    user.lastName = registerAuthDto.lastName;
    user.email = registerAuthDto.email;
    // NOTE: Hash password before saving
    user.password = await hash(registerAuthDto.password, 10);
    user.dni = registerAuthDto.dni;
    user.phoneNumber = registerAuthDto.phoneNumber;
    user.roles = registerAuthDto.roles;

    const userExists = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (userExists)
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);

    const newUser = await this.userRepository.save(user);
    const { password, ...result } = newUser;
    return result;
  }
}
