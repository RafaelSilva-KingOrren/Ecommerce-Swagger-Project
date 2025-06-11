import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthLogin } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async getAuth() {
    return this.authRepository.getAuth();
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    return this.authRepository.validateCredentials(email, password);
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
