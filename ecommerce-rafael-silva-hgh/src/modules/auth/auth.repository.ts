import { Injectable } from '@nestjs/common';
import { AuthLoginDTO } from './auth.interface';

@Injectable()
export class AuthRepository {
  private auth: AuthLoginDTO[] = [
    {
      email: 'king@example.com',
      password: '123',
    },
    {
      email: 'orren@example.com',
      password: '123',
    },
  ];

  async postAuth() {
    return 'Autenticacion';
  }
}
