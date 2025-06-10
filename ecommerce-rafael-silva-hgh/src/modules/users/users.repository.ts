import { Injectable } from '@nestjs/common';
import { User, UserWithoutPass } from './interfaces/user.interface';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserRegisterDTO } from './dto/UserDTO';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: '5R0H4@example.com',
      name: 'Rafael',
      password: '123456',
      address: 'Calle 123',
      phone: '1234567890',
      country: 'Colombia',
      city: 'Bogota',
    },
    {
      id: 2,
      email: '5wR0H4@example.com',
      name: 'Sofi',
      password: '123456',
      address: 'Calle 123',
      phone: '1234567890',
      country: 'Uruguay',
      city: 'Montevideo',
    },
    {
      id: 3,
      email: '5R0qqqqH4@example.com',
      name: 'Lalo',
      password: '123456',
      address: 'Calle 123',
      phone: '1234567890',
      country: 'ecuador',
      city: 'quito',
    },
  ];

  async getUsers() {
    return this.users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  async getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async getUserByName(name: string) {
    const user = this.users.find((user) => user.name === name);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async createUser(user: UserRegisterDTO): Promise<UserWithoutPass> {
    const dto = plainToInstance(UserRegisterDTO, user);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}).join(', '))
        .join('; ');
      throw new BadRequestException(`Errores de validación: ${errorMessages}`);
    }

    const newId = Math.max(...this.users.map((user) => user.id)) + 1;
    const newUser = { ...user, id: newId };

    this.users.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(id: number, updateData: Partial<User>) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const currentUser = this.users[userIndex];
    const updatedUser = {
      ...currentUser,
      ...updateData,
      id: currentUser.id,
      password: updateData.password || currentUser.password,
    };

    this.users[userIndex] = updatedUser;

    return { id: updatedUser.id, message: 'Usuario editado' };
  }

  async deleteUser(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const deletedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return {
      id: deletedUser.id,
      message: `Usuario ${deletedUser.name} eliminado`,
    };
  }
}
