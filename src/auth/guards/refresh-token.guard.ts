import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { verifyRefreshToken } from 'src/utils/use.token';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const refreshToken = req.header('token').split(' ')[1];

    const verifyAccesToken = verifyRefreshToken(refreshToken);
    if (typeof verifyAccesToken === 'string') {
      if (verifyAccesToken === 'jwt expired') {
      }
      if (verifyAccesToken === 'jwt not active')
        throw new UnauthorizedException('Token inactivo');
      if (verifyAccesToken === 'invalid token')
        throw new UnauthorizedException('aqui Token invalido');
      throw new UnauthorizedException('Error aqui: ' + verifyAccesToken);
    }
    //    throw new UnauthorizedException('Token expired');

    return true;
  }
}
