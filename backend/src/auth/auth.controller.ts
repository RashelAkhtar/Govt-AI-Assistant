import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CreateUserDto } from 'src/user/types/CreateUserDto';
import { UserModel } from 'src/generated/prisma/models';
import type { LoginUserDto } from './types/LoginUserDto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async resgisterUser(
    @Body()
    dto: CreateUserDto,
  ): Promise<UserModel> {
    return this.authService.registerUser(dto);
  }

  @Post('/login')
  async loginUser(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }
}
