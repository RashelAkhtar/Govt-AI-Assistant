import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CreateUserDto } from 'src/user/types/CreateUserDto';
import { UserModel } from 'src/generated/prisma/models';
import type { LoginUserDto } from './types/LoginUserDto';
import type { Response } from 'express';

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
  async loginUser(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.loginUser(dto);
    res.cookie('access_token', String(user.access_token), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      message: 'Login successful',
      role: user?.role,
    };
  }

  @Post('/logout')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', {
      path: '/',
    });

    return {
      message: 'Logout successful',
    };
  }
}
