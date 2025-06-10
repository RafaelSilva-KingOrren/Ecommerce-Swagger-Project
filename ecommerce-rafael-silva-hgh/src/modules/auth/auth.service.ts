import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth() {
    return 'Autenticacion';
  }

  postAuth() {
    return 'Autenticacion';
  }
}
