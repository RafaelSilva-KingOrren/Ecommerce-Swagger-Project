import { Injectable } from '@nestjs/common';
import { AuthLogin } from './auth.interface';

@Injectable()
export class AuthRepository {
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

  async validateCredentials(email: string, password: string): Promise<boolean> {
    const user = this.auth.find(
      (user) => user.email === email && user.password === password,
    );
    return !!user;
  }
}
