import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthLogin } from './auth.interface';

@Injectable()
export class AuthService {
  private auth: AuthLogin[] = [
    {
      id: 1,
      email: 'king@example.com',
      password: '123',
    },
    {
      id: 2,
      email: 'orren@example.com',
      password: '123',
    },
  ];

  async getAuth() {
    return this.auth;
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = this.auth.find(
      (user) => user.email === email && user.password === password,
    );
    return !!user;
  }

  async login(credentials: AuthLogin) {
    const isValid = await this.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!isValid) {
      throw new BadRequestException('Correo o contraseña incorrectos');
    }
    return { message: 'Autenticación exitosa' };
  }
}
