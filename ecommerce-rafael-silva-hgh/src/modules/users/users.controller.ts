// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRegisterDTO } from './dto/UserDTO';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.usersService.getUsers(+page, +limit);
    }
    return this.usersService.getUsers(1, 3);
  }

  @Get('name')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserByName(@Query('name') name: string) {
    return this.usersService.getUserByName(name);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createUser(@Body() user: UserRegisterDTO) {
  //   return this.usersService.createUser(user);
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: Partial<User>,
  ) {
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
