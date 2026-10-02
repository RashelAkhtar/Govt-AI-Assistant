import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from 'src/generated/prisma/models';
import type { CreateUserDto } from './types/CreateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
