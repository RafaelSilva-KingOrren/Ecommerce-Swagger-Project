import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, UserWithoutPass } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(page: number, limit: number): Promise<UserWithoutPass[]> {
    const users = await this.usersRepository.getUsers();
    const start = (page - 1) * limit;
    const end = page * limit;
    return users.slice(start, end);
  }

  getUserById(id: number) {
    return this.usersRepository.getUserById(id);
  }

  getUserByName(name: string) {
    return this.usersRepository.getUserByName(name);
  }

  createUser(user: User) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: number, updateData: Partial<User>) {
    return this.usersRepository.updateUser(id, updateData);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
