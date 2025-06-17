import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLogin } from './auth.interface';
import { UserRegisterDTO } from '../users/dto/UserDTO';
import { Auth } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }
  //admins creator
  @Post('signinAdmin')
  async postAuth(@Body() credentials: AuthLogin) {
    return this.authService.loginAdmin(credentials);
  }

  @Post('signinUser')
  async postUser(@Body() credentials: AuthLogin) {
    return this.authService.loginUser(credentials);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: UserRegisterDTO) {
    return this.authService.createUser(user);
  }
}
