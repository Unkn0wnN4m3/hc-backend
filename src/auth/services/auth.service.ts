import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EmployeesService } from 'src/employees/employees.service';
import { Employee } from 'src/employees/entities/employee.entity';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly employeesService: EmployeesService) {}
  async validateEmployee(email: string, password: string) {
    const employeeByEmail = await this.employeesService.findBy({
      key: 'email',
      value: email,
    });

    if (employeeByEmail) {
      const match = await bcrypt.compare(password, employeeByEmail.password);
      if (match) return employeeByEmail;
    }

    return null;
  }

  signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  async generateJWT(employee: Employee): Promise<any> {
    const getEmployee = await this.employeesService.findOne(employee.id);

    const payload: PayloadToken = {
      role: getEmployee.roles,
      sub: getEmployee.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      employee,
    };
  }
}
