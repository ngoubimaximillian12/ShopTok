import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { username: string; email: string; passwordHash: string }): Promise<User> {
    return this.usersService.create(body);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.findById(id);
  }
}
