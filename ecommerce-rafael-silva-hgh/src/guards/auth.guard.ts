import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly users = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user1234' },
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Faltan credenciales');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [email, password] = credentials.split(':');

    const userExists = this.users.some(
      (user) => user.email === email && user.password === password,
    );

    if (!userExists) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return true;
  }
}
