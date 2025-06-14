import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserWithoutPass } from './interfaces/user.interface';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserRegisterDTO } from './dto/UserDTO';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<UserWithoutPass[]> {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders', 'orders.orderDetails'],
    });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async getUserByName(name: string) {
    const user = await this.usersRepository.findOne({
      where: { name },
    });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
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

  async updateUser(id: string, updateData: Partial<User>) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      // Si se está actualizando el email, verificar que no exista
      if (updateData.email) {
        const existingUser = await this.usersRepository.findOne({
          where: { email: updateData.email },
        });
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException(
            'El correo electrónico ya está registrado',
          );
        }
      }

      const updatedUser = this.usersRepository.merge(user, updateData);
      await this.usersRepository.save(updatedUser);

      return { id: updatedUser.id, message: 'Usuario editado' };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(
        'Error al actualizar el usuario: ' + error.message,
      );
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      await this.usersRepository.remove(user);
      return {
        id: user.id,
        message: `Usuario ${user.name} eliminado`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Error al eliminar el usuario: ' + error.message,
      );
    }
  }
}
