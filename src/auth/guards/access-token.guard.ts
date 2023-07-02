import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { verifyAccessToken } from 'src/utils/use.token';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const accessToken = req.header('token').split(' ')[1];

    const verifyAccesToken = verifyAccessToken(accessToken);
    if (typeof verifyAccesToken === 'string') {
      if (verifyAccesToken === 'jwt expired')
        throw new UnauthorizedException('Token expired');
      if (verifyAccesToken === 'jwt not active')
        throw new UnauthorizedException('Token inactivo');
      if (verifyAccesToken === 'invalid token')
        throw new UnauthorizedException('Token invalido');
      throw new UnauthorizedException('Erroraq: ' + verifyAccesToken);
    }
    return true;
  }
}
