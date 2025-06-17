import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('No se proporcionó token de autenticación');
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new UnauthorizedException('Error de configuración del servidor');
    }

    try {
      const user = this.jwtService.verify(token, { secret }); //payload

if(user.isAdmin){
  user.roles = [Role.Admin];
}else{
  user.roles = [Role.User];
}

      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}

















//primera version, puro token con contraseña

// @Injectable()
// export class AuthGuard implements CanActivate {
//   private readonly users = [
//     { email: 'admin@example.com', password: 'admin123' },
//     { email: 'user@example.com', password: 'user1234' },
//   ];

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest<Request>();
//     const authHeader = request.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Basic ')) {
//       throw new UnauthorizedException('Faltan credenciales');
//     }

//     const base64Credentials = authHeader.split(' ')[1];
//     const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
//     const [email, password] = credentials.split(':');

//     const userExists = this.users.some(
//       (user) => user.email === email && user.password === password,
//     );

//     if (!userExists) {
//       throw new UnauthorizedException('Credenciales inválidas');
//     }

//     return true;
//   }
// }
