import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { AuthLogin } from './auth.interface';
import { User } from '../users/users.entity';
import { Auth, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDTO } from '../users/dto/UserDTO';
import { plainToInstance } from 'class-transformer';
import { UserWithoutPass } from '../users/interfaces/user.interface';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
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

  //Validate para admin y User
  async validateUser(email: string, password: string): Promise<boolean> {
    const user = this.auth.find(
      (user) => user.email === email && user.password === password,
    );
    return !!user;
  }

  async getAuth() {
    return this.auth;
  }


  async loginAdmin(credentials: AuthLogin) {
    const isValid = await this.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!isValid) {
      throw new BadRequestException('Correo o contraseña incorrectos');
    }
    if (!credentials.email || !credentials.password) {
      throw new BadRequestException('Faltan credenciales');
    }
    return { message: `Autenticación exitosa, bienvenido Admin: ${credentials.email}` };
  }

  async loginUser(credentials: AuthLogin) {
    const findUser: User|null = await this.usersRepository.findOne({
      where: { email: credentials.email },
    });
    if(!findUser) throw new BadRequestException('Correo o contraseña incorrectos');

    const passwordMatch = await bcrypt.compare(credentials.password, findUser.password);
    if (!passwordMatch) throw new BadRequestException(`Correo o contraseña incorrectos`);

      const payload = {
        id: findUser.id,
        email: findUser.email,
        isAdmin: findUser.isAdmin,
      };
      const token = this.jwtService.sign(payload);
      return  token;
  }

  async createUser(user: UserRegisterDTO): Promise<UserWithoutPass> {
    try {
      const dto = plainToInstance(UserRegisterDTO, user);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values(error.constraints || {}).join(', '))
          .join('; ');
        throw new BadRequestException(
          `Errores de validación: ${errorMessages}`,
        );
      }

      const existingUserName = await this.usersRepository.findOne({
        where: { name: user.name },
      });

      if (existingUserName) {
        throw new ConflictException('El username ya está registrado');
      }

      const existingUser = await this.usersRepository.findOne({
        where: { email: user.email },
      });

      if (existingUser) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }

      const newUser = this.usersRepository.create({
        ...user,
        isAdmin: false,
      });

      //Bcrypt =D
      newUser.password = await bcrypt.hash(newUser.password, 10);

      const savedUser = await this.usersRepository.save(newUser);
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      if (error.code === '23505') {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
      throw new BadRequestException(
        'Error al crear el usuario: ' + error.message,
      );
    }
  }
}
