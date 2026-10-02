import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './types/LoginUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(data: Prisma.UserCreateInput): Promise<User> {
    const password = data?.password;
    const hashPassword: string = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      ...data,
      password: hashPassword,
    });

    return user;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
