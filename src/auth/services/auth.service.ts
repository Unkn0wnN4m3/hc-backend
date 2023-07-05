import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EmployeesService } from 'src/employees/services/employees.service';
import { Employee } from 'src/employees/entities/employee.entity';
import { IUseToken, PayloadToken } from '../interfaces/auth.interface';
import { AuthDTO } from '../dto/auth.dto';
import { useToken, verifyRefreshToken } from 'src/utils/use.token';
import { Token } from '../entities/token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenDto } from '../dto/create-token.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { Request } from 'express';
import { ROLES } from 'src/const/role.enum';
import { Game } from 'src/games/entities/game.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private readonly employeesService: EmployeesService,
  ) {}

  //Login, devuelve accestoken, verifytoken y user
  async validateEmployee(body: AuthDTO) {
    try {
      const employee = await this.employeesService.findBy({
        key: 'email',
        value: body.email,
      });

      if (employee) {
        const match = await bcrypt.compare(body.password, employee.password);

        if (match) {
          const accessToken = await this.generateAccessToken(employee);
          const refreshToken = await this.generateRefreshToken(employee);

          console.log(accessToken, refreshToken);

          const tokenDB = await this.createRefreshToken({ ...refreshToken });

          if (tokenDB) return { accessToken, refreshToken, employee };
        }
      }
    } catch (error) {
      return error;
    }
  }

  // Pide info del usuario con el access token
  async employeeInfo(req: Request) {
    try {
      const token = req.header('token').split(' ')[1];
      console.log('3: ' + token);

      const decodedToken: IUseToken = useToken(token);

      const employee: Employee = await this.employeesService.findOne(
        decodedToken.sub,
      );
      if (!employee)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Empleado no encontrado',
        });

      return employee;
    } catch (error) {
      if (error instanceof ErrorManager) {
        throw ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }

  // Genera un nuevo access token con el refresh token
  async refreshToken(req: Request) {
    try {
      const refreshToken = req.header('token').split(' ')[1];
      console.log('aqui; ' + refreshToken);

      const decodedToken: IUseToken = useToken(refreshToken);

      const employee = await this.employeesService.findOne(decodedToken.sub);
      if (!employee)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Empleado no encontrado',
        });

      const tokenDB: Token = await this.tokenRepository.findOneBy({
        token: refreshToken,
      });
      if (!tokenDB)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Token no encontrado',
        });

      const verifyTokenDB = verifyRefreshToken(tokenDB.token);
      if (typeof verifyTokenDB === 'string') {
        if (verifyTokenDB === 'jwt expired')
          try {
            await this.tokenRepository.delete({ id: tokenDB.id });
          } catch (error) {
            throw new ErrorManager({
              type: 'INTERNAL_SERVER_ERROR',
              message: 'Error al intentar eliminar el token',
            });
          }
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Token expired',
        });
      }

      return await this.generateAccessToken(employee);
    } catch (error) {
      if (error instanceof ErrorManager) {
        throw ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }
  //Servicio de logout

  async createRefreshToken(token: CreateTokenDto) {
    try {
      return await this.tokenRepository.save(token);
    } catch (error) {
      throw new Error(error);
    }
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

  async generateAccessToken(employee: Employee) {
    return this.generateJWT(employee, true, 1200);
  }

  async generateRefreshToken(employee: Employee) {
    return this.generateJWT(employee, false, 28800);
  }

  async generateJWT(
    employee: Employee,
    isAccessToken: boolean,
    expires: number,
  ): Promise<any> {
    const getEmployee = await this.employeesService.findOne(employee.id);

    const payload: PayloadToken = {
      role: getEmployee.roles,
      sub: getEmployee.id,
    };
    const secret = isAccessToken
      ? process.env.JWT_ACCESS_SECRET
      : process.env.JWT_REFRESH_SECRET;
    return {
      token: this.signJWT({
        payload,
        secret: secret,
        expires: expires,
      }),
    };
  }
}
