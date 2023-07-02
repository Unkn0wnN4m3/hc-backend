import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { Request } from 'express';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { TokenGuard } from '../guards/token.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: AuthDTO) {
    const employee = await this.authService.validateEmployee(body);

    if (!employee) {
      throw new UnauthorizedException('Data not valid');
    }
    return employee;
  }

  @UseGuards(TokenGuard, AccessTokenGuard)
  @Get('info')
  async employeeInfo(@Req() req: Request) {
    return await this.authService.employeeInfo(req);
  }

  @UseGuards(TokenGuard, RefreshTokenGuard)
  @Get('refresh')
  async refreshToken(@Req() req: Request) {
    console.log('entr refres');
    return await this.authService.refreshToken(req);
  }
}
