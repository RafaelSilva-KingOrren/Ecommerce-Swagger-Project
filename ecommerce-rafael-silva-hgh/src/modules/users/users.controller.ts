// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.usersService.getUsers(+page, +limit);
    }
    return this.usersService.getUsers(1, 3);
  }

  @Get('name')
  @UseGuards(AuthGuard)
  getUserByName(@Query('name') name: string) {
    return this.usersService.getUserByName(name);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.usersService.updateUser(Number(id), updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
