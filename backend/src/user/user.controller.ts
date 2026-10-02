import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from 'src/generated/prisma/models';
import type { CreateUserDto } from './types/CreateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    dto: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(dto);
  }
}
