import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import type { UserCreateInput } from 'src/generated/prisma/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.user({ id });
  }

  @Post()
  async create(@Body() data: UserCreateInput) {
    const user = await this.userService.createUser(data);
    return user;
  }
}
