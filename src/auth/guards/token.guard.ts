import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['token'];
    if (!token || Array.isArray(token))
      throw new UnauthorizedException('Token no proporcionado');

    const bearer = token.split(' ')[0];
    if (!bearer || bearer != 'Bearer')
      throw new UnauthorizedException('Token invalido');

    return true;
  }
}
